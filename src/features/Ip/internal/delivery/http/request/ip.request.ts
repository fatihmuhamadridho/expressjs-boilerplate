export interface IpQueryRequest {
  queryString: string;
  headers: Readonly<Record<string, string>>;
}
