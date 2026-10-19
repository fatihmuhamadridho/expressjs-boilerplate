export interface OpenAPIQueryRequest {
  queryString: string;
  headers: Readonly<Record<string, string>>;
}
