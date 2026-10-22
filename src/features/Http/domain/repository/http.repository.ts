import type { ResourceResult } from '../../../../pkg/httpclient/http-client';

export interface HttpQuery {
  queryString: string;
  headers: Readonly<Record<string, string>>;
}

export interface HttpRepository {
  getStatus(httpCode: string, query: HttpQuery): Promise<ResourceResult>;
  getStatusMessage(httpCode: string, message: string, query: HttpQuery): Promise<ResourceResult>;
}
