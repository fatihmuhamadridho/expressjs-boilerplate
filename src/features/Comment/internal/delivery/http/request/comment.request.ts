export interface CommentQueryRequest {
  queryString: string;
  headers: Readonly<Record<string, string>>;
}

export interface CommentCommandRequest {
  headers: Readonly<Record<string, string>>;
  body?: Uint8Array;
}
