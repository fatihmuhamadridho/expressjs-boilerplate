export interface UpstreamConfig {
  baseUrl: string;
  timeoutMs: number;
  requestBodyLimit: string;
}

export function getUpstreamConfig(): UpstreamConfig {
  const rawBaseUrl = process.env.UPSTREAM_API_BASE_URL ?? 'https://dummyjson.com';
  const parsedBaseUrl = new URL(rawBaseUrl);

  if (
    !['http:', 'https:'].includes(parsedBaseUrl.protocol) ||
    parsedBaseUrl.username.length > 0 ||
    parsedBaseUrl.password.length > 0 ||
    parsedBaseUrl.pathname !== '/' ||
    parsedBaseUrl.search.length > 0 ||
    parsedBaseUrl.hash.length > 0
  ) {
    throw new Error('UPSTREAM_API_BASE_URL must be an HTTP(S) origin without credentials or a path');
  }

  const timeoutMs = Number(process.env.UPSTREAM_TIMEOUT_MS ?? 10000);
  if (!Number.isSafeInteger(timeoutMs) || timeoutMs < 1) {
    throw new Error('UPSTREAM_TIMEOUT_MS must be a positive integer');
  }

  return {
    baseUrl: parsedBaseUrl.origin,
    timeoutMs,
    requestBodyLimit: process.env.REQUEST_BODY_LIMIT ?? '5mb',
  };
}
