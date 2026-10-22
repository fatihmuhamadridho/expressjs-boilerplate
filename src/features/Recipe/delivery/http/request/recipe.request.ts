export interface RecipeQueryRequest {
  queryString: string;
  headers: Readonly<Record<string, string>>;
}

export interface RecipeCommandRequest {
  queryString?: string;
  headers: Readonly<Record<string, string>>;
  body?: Uint8Array;
}
