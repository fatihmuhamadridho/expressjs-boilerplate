export type ResourceMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
export type ResourceHeaderValue = string | readonly string[];

export interface ResourceRequest {
  method: ResourceMethod;
  pathAndQuery: string;
  headers: Readonly<Record<string, string>>;
  body?: Uint8Array;
}

export interface ResourceResult {
  statusCode: number;
  headers: Readonly<Record<string, ResourceHeaderValue>>;
  body: Uint8Array;
}

/** Port used by resource-specific repositories to reach Upstream service over HTTP. */
export interface ResourceGateway {
  forward(request: ResourceRequest): Promise<ResourceResult>;
}
