export interface TestQueryRequest {
  queryString: string;
  headers: Readonly<Record<string, string>>;
}

export interface TestCommandRequest {
  headers: Readonly<Record<string, string>>;
  body?: Uint8Array;
}
