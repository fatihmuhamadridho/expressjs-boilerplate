export interface ProductQueryRequest {
  queryString: string;
  headers: Readonly<Record<string, string>>;
}

export interface ProductCommandRequest {
  headers: Readonly<Record<string, string>>;
  body?: Uint8Array;
}
