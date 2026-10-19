import type { DummyJsonResponse } from '../../../../common/dummyjson/application/dummyjson.interface';

export interface OpenAPIQuery {
  queryString: string;
  headers: Readonly<Record<string, string>>;
}

export interface OpenAPIRepository {
  getSpec(query: OpenAPIQuery): Promise<DummyJsonResponse>;
}
