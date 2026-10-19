import type { DummyJsonResponse } from '../../../../common/dummyjson/application/dummyjson.interface';

export interface QuoteQuery {
  queryString: string;
  headers: Readonly<Record<string, string>>;
}

export interface QuoteRepository {
  getAll(query: QuoteQuery): Promise<DummyJsonResponse>;
  getById(id: string, query: QuoteQuery): Promise<DummyJsonResponse>;
  getRandom(query: QuoteQuery): Promise<DummyJsonResponse>;
  getRandomBatch(length: string, query: QuoteQuery): Promise<DummyJsonResponse>;
}
