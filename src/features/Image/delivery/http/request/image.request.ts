export interface ImageQueryRequest {
  queryString: string;
  headers: Readonly<Record<string, string>>;
}

export interface GenerateImageRequest {
  size: string;
  background?: string;
  color?: string;
  type?: string;
  query: ImageQueryRequest;
}
