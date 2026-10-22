export interface PostQueryRequest {
  queryString: string;
  headers: Readonly<Record<string, string>>;
}

export interface PostCommandRequest {
  queryString?: string;
  headers: Readonly<Record<string, string>>;
  body?: Uint8Array;
}
