export interface TwoFactorQueryRequest {
  queryString: string;
  headers: Readonly<Record<string, string>>;
}

export interface TwoFactorCommandRequest {
  headers: Readonly<Record<string, string>>;
  body?: Uint8Array;
}
