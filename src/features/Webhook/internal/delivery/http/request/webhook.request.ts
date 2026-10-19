export interface WebhookQueryRequest {
  queryString: string;
  headers: Readonly<Record<string, string>>;
}

export interface WebhookCommandRequest {
  headers: Readonly<Record<string, string>>;
  body?: Uint8Array;
}
