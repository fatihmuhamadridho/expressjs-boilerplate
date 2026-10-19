import type { DummyJsonResponse } from '../../../../../common/dummyjson/application/dummyjson.interface';
import type { ImageQuery } from '../image.interface';

export interface GenerateImageDTO {
  size: string;
  background?: string;
  color?: string;
  type?: string;
  query: ImageQuery;
}

export type ImageResultDTO = DummyJsonResponse;
