export interface TodoQueryRequest {
  queryString: string;
  headers: Readonly<Record<string, string>>;
}

export interface TodoCommandRequest {
  headers: Readonly<Record<string, string>>;
  body?: Uint8Array;
}
