export interface UserQueryRequest {
  queryString: string;
  headers: Readonly<Record<string, string>>;
}

export interface UserCommandRequest {
  queryString?: string;
  headers: Readonly<Record<string, string>>;
  body?: Uint8Array;
}
