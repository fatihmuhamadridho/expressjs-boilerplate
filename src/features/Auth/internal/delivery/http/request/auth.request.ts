export interface AuthQueryRequest {
  queryString: string;
  headers: Readonly<Record<string, string>>;
}

export interface AuthCommandRequest {
  headers: Readonly<Record<string, string>>;
  body?: Uint8Array;
}
