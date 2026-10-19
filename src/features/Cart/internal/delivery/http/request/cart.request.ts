export interface CartQueryRequest {
  queryString: string;
  headers: Readonly<Record<string, string>>;
}
export interface CartCommandRequest {
  headers: Readonly<Record<string, string>>;
  body?: Uint8Array;
}
