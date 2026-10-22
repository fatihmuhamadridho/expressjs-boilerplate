import type { ResourceResult } from '../../../../pkg/httpclient/http-client';

export interface QuoteQuery {
  queryString: string;
  headers: Readonly<Record<string, string>>;
}

export interface QuoteRepository {
  getAll(query: QuoteQuery): Promise<ResourceResult>;
  getById(id: string, query: QuoteQuery): Promise<ResourceResult>;
  getRandom(query: QuoteQuery): Promise<ResourceResult>;
  getRandomBatch(length: string, query: QuoteQuery): Promise<ResourceResult>;
}
