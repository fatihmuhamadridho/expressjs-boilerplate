export type DummyJsonMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
export type DummyJsonHeaderValue = string | readonly string[];

export interface DummyJsonRequest {
  method: DummyJsonMethod;
  pathAndQuery: string;
  headers: Readonly<Record<string, string>>;
  body?: Uint8Array;
}

export interface DummyJsonResponse {
  statusCode: number;
  headers: Readonly<Record<string, DummyJsonHeaderValue>>;
  body: Uint8Array;
}

/** Port used by resource-specific repositories to reach DummyJSON over HTTP. */
export interface DummyJsonGateway {
  forward(request: DummyJsonRequest): Promise<DummyJsonResponse>;
}

export class DummyJsonGatewayError extends Error {
  constructor(
    message: string,
    readonly kind: 'timeout' | 'unavailable',
    options?: ErrorOptions
  ) {
    super(message, options);
    this.name = 'DummyJsonGatewayError';
  }
}
