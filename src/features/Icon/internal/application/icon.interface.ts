import type { DummyJsonResponse } from '../../../../common/dummyjson/application/dummyjson.interface';

export interface IconQuery {
  queryString: string;
  headers: Readonly<Record<string, string>>;
}

export interface IconRepository {
  getDefault(query: IconQuery): Promise<DummyJsonResponse>;
  getByHash(hash: string, query: IconQuery): Promise<DummyJsonResponse>;
  getByHashAndSize(hash: string, size: string, query: IconQuery): Promise<DummyJsonResponse>;
}
