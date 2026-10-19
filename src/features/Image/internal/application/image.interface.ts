import type { DummyJsonResponse } from '../../../../common/dummyjson/application/dummyjson.interface';

export interface ImageQuery {
  queryString: string;
  headers: Readonly<Record<string, string>>;
}

export interface ImageRepository {
  generate(
    size: string,
    options: { background?: string; color?: string; type?: string },
    query: ImageQuery
  ): Promise<DummyJsonResponse>;
}
