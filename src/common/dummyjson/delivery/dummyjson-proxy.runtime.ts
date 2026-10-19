import express, { type Request, type RequestHandler } from 'express';
import type { DummyJsonMethod, DummyJsonResponse } from '../application/dummyjson.interface';
import { DummyJsonGatewayError } from '../application/dummyjson.interface';

const supportedMethods: readonly DummyJsonMethod[] = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'];
const hopByHopHeaders = new Set([
  'connection',
  'content-length',
  'expect',
  'host',
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

export interface DummyJsonResource {
  readonly name: string;
  readonly methods: readonly DummyJsonMethod[];
  readonly mountPaths: readonly string[];
  readonly routes: RequestHandler;
}

export type DummyJsonRouteHandler = (
  request: Request,
  method: DummyJsonMethod,
  pathAndQuery: string
) => Promise<DummyJsonResponse>;

export interface DummyJsonRouteDefinition {
  method: DummyJsonMethod;
  route: string;
  path: (request: Request) => string;
}

class DummyJsonRequestError extends Error {
  constructor(
    message: string,
    readonly statusCode: 400 | 405,
    readonly allow?: string
  ) {
    super(message);
    this.name = 'DummyJsonRequestError';
  }
}

function mergePathAndQuery(request: Request, path: string): string {
  const queryIndex = request.originalUrl.indexOf('?');
  return queryIndex === -1 ? path : `${path}${request.originalUrl.slice(queryIndex)}`;
}

function collectHeaders(request: Request): Record<string, string> {
  const headers: Record<string, string> = {};
  const connectionHeaders = (request.get('connection') ?? '')
    .split(',')
    .map((header) => header.trim().toLowerCase())
    .filter(Boolean);
  const excludedHeaders = new Set([...hopByHopHeaders, 'accept-encoding', ...connectionHeaders]);
  for (const [name, value] of Object.entries(request.headers)) {
    const normalizedName = name.toLowerCase();
    if (value === undefined || excludedHeaders.has(normalizedName)) continue;
    headers[normalizedName] = Array.isArray(value)
      ? normalizedName === 'cookie'
        ? value.join('; ')
        : value.join(', ')
      : value;
  }
  delete headers['x-forwarded-for'];
  if (request.ip) headers['x-forwarded-for'] = request.ip;
  return headers;
}

export const dummyJsonProxyRuntime: {
  handle: (forward: DummyJsonRouteHandler) => RequestHandler;
  createRoutes: (
    methods: readonly DummyJsonMethod[],
    routeDefinitions: ReadonlyArray<DummyJsonRouteDefinition>,
    forward: DummyJsonRouteHandler
  ) => RequestHandler;
} = {
  handle:
    (forward: DummyJsonRouteHandler): RequestHandler =>
    async (request, response, next) => {
      try {
        const path = request.url.split('?')[0] || '/';
        const result = await forward(
          request,
          request.method.toUpperCase() as DummyJsonMethod,
          mergePathAndQuery(request, path)
        );
        for (const [name, value] of Object.entries(result.headers)) {
          response.setHeader(name, Array.isArray(value) ? [...value] : value);
        }
        response.status(result.statusCode).send(Buffer.from(result.body));
      } catch (error) {
        if (error instanceof DummyJsonRequestError) {
          if (error.allow) response.setHeader('allow', error.allow);
          response.status(error.statusCode).json({ message: error.message });
          return;
        }
        if (error instanceof DummyJsonGatewayError) {
          response.status(error.kind === 'timeout' ? 504 : 502).json({ message: error.message });
          return;
        }
        next(error);
      }
    },

  createRoutes: (methods, routeDefinitions, forward): RequestHandler => {
    const router = express.Router();
    const allowedMethods = [...new Set([...methods, 'OPTIONS' as const])];
    for (const definition of routeDefinitions) {
      router[definition.method.toLowerCase() as Lowercase<DummyJsonMethod>](
        definition.route,
        dummyJsonProxyRuntime.handle((request, method) =>
          forward(request, method, mergePathAndQuery(request, definition.path(request)))
        )
      );
    }
    router.all('*path', (request, response, next) => {
      if (request.method === 'OPTIONS') {
        response.setHeader('allow', allowedMethods.join(', '));
        response.status(204).end();
        return;
      }
      if (!supportedMethods.includes(request.method.toUpperCase() as DummyJsonMethod)) {
        response.setHeader('allow', allowedMethods.join(', '));
        response.status(405).json({ message: `Method ${request.method} is not supported` });
        return;
      }
      next();
    });
    return router;
  },
};

export function createDummyJsonResource(
  name: string,
  mountPaths: readonly string[],
  methods: readonly DummyJsonMethod[],
  repositoryForward: DummyJsonRouteHandler,
  routeDefinitions: ReadonlyArray<{
    method: DummyJsonMethod;
    route: string;
    path: (request: Request) => string;
  }>
): DummyJsonResource {
  return {
    name,
    mountPaths,
    methods,
    routes: dummyJsonProxyRuntime.createRoutes(methods, routeDefinitions, repositoryForward),
  };
}

export { collectHeaders };
