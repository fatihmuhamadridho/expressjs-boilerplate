export interface CustomResponseQueryRequest {
  queryString: string;
  headers: Readonly<Record<string, string>>;
}

export interface CustomResponseCommandRequest {
  queryString?: string;
  headers: Readonly<Record<string, string>>;
  body?: Uint8Array;
}
