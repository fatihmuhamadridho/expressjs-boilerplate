export interface HttpQueryRequest {
  queryString: string;
  headers: Readonly<Record<string, string>>;
}
