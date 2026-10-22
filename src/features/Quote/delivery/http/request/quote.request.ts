export interface QuoteQueryRequest {
  queryString: string;
  headers: Readonly<Record<string, string>>;
}
