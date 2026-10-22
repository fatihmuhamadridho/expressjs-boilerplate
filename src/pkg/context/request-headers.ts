import type { Request } from 'express';

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

export function collectHeaders(request: Request): Record<string, string> {
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
