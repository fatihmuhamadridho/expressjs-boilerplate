import type { ResourceResult } from '../../../../pkg/httpclient/http-client';

export interface IconQuery {
  queryString: string;
  headers: Readonly<Record<string, string>>;
}

export interface IconRepository {
  getDefault(query: IconQuery): Promise<ResourceResult>;
  getByHash(hash: string, query: IconQuery): Promise<ResourceResult>;
  getByHashAndSize(hash: string, size: string, query: IconQuery): Promise<ResourceResult>;
}
