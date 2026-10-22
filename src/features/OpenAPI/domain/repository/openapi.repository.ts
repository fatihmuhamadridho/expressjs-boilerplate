import type { ResourceResult } from '../../../../pkg/httpclient/http-client';

export interface OpenAPIQuery {
  queryString: string;
  headers: Readonly<Record<string, string>>;
}

export interface OpenAPIRepository {
  getSpec(query: OpenAPIQuery): Promise<ResourceResult>;
}
