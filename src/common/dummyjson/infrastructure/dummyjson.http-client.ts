import type { DummyJsonGateway, DummyJsonRequest, DummyJsonResponse } from '../application/dummyjson.interface';
import { DummyJsonGatewayError } from '../application/dummyjson.interface';
import type { DummyJsonConfig } from './dummyjson.config';

const hopByHopHeaders = new Set([
  'connection',
  'content-encoding',
  'content-length',
  'keep-alive',
  'proxy-authenticate',
  'proxy-authorization',
  'proxy-connection',
  'set-cookie',
  'te',
  'trailer',
  'transfer-encoding',
  'upgrade',
]);

export class DummyJsonHttpClient implements DummyJsonGateway {
  constructor(private readonly config: DummyJsonConfig) {}

  async forward(request: DummyJsonRequest): Promise<DummyJsonResponse> {
    const target = new URL(request.pathAndQuery, this.config.baseUrl);
    if (target.origin !== this.config.baseUrl) {
      throw new DummyJsonGatewayError('DummyJSON request target is invalid', 'unavailable');
    }

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), this.config.timeoutMs);

    try {
      const response = await fetch(target, {
        method: request.method,
        headers: request.headers,
        body: request.method === 'GET' || request.body === undefined ? undefined : new Uint8Array(request.body),
        redirect: 'manual',
        signal: controller.signal,
      });

      const body = new Uint8Array(await response.arrayBuffer());
      const headers: Record<string, string | readonly string[]> = {};
      const connectionHeaders = (response.headers.get('connection') ?? '')
        .split(',')
        .map((header) => header.trim().toLowerCase())
        .filter(Boolean);
      const excludedHeaders = new Set([...hopByHopHeaders, ...connectionHeaders]);
      for (const [name, value] of response.headers) {
        if (!excludedHeaders.has(name)) headers[name] = value;
      }

      const cookies = response.headers.getSetCookie().map((cookie) => cookie.replace(/;\s*domain=[^;]*/i, ''));
      if (cookies.length > 0) headers['set-cookie'] = cookies;
      return { statusCode: response.status, headers, body };
    } catch (error) {
      if (error instanceof DummyJsonGatewayError) throw error;
      if (controller.signal.aborted) {
        throw new DummyJsonGatewayError('DummyJSON request timed out', 'timeout', { cause: error });
      }
      throw new DummyJsonGatewayError('DummyJSON is unavailable', 'unavailable', { cause: error });
    } finally {
      clearTimeout(timeout);
    }
  }
}
