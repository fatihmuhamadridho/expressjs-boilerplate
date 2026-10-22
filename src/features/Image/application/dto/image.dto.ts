import type { ResourceResult } from '../../../../pkg/httpclient/http-client';
import type { ImageQuery } from '../../domain/repository/image.repository';

export interface GenerateImageDTO {
  size: string;
  background?: string;
  color?: string;
  type?: string;
  query: ImageQuery;
}

export type ImageResultDTO = ResourceResult;
