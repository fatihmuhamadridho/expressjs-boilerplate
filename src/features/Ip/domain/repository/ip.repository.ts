import type { ResourceResult } from '../../../../pkg/httpclient/http-client';

export interface IpQuery {
  queryString: string;
  headers: Readonly<Record<string, string>>;
}

export interface IpRepository {
  lookup(query: IpQuery): Promise<ResourceResult>;
}
