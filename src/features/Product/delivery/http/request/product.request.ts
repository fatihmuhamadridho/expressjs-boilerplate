export interface ProductQueryRequest {
  queryString: string;
  headers: Readonly<Record<string, string>>;
}

export interface ProductCommandRequest {
  queryString?: string;
  headers: Readonly<Record<string, string>>;
  body?: Uint8Array;
}
