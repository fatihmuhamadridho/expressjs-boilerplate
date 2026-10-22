export interface TestQueryRequest {
  queryString: string;
  headers: Readonly<Record<string, string>>;
}

export interface TestCommandRequest {
  queryString?: string;
  headers: Readonly<Record<string, string>>;
  body?: Uint8Array;
}
