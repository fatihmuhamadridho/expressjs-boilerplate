import type { DummyJsonResponse } from '../../../../common/dummyjson/application/dummyjson.interface';

export interface HttpQuery {
  queryString: string;
  headers: Readonly<Record<string, string>>;
}

export interface HttpRepository {
  getStatus(httpCode: string, query: HttpQuery): Promise<DummyJsonResponse>;
  getStatusMessage(httpCode: string, message: string, query: HttpQuery): Promise<DummyJsonResponse>;
}
