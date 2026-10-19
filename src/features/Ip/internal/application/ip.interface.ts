import type { DummyJsonResponse } from '../../../../common/dummyjson/application/dummyjson.interface';

export interface IpQuery {
  queryString: string;
  headers: Readonly<Record<string, string>>;
}

export interface IpRepository {
  lookup(query: IpQuery): Promise<DummyJsonResponse>;
}
