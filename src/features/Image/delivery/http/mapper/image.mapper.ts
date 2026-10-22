import type { Request } from 'express';
import { collectHeaders } from '../../../../../pkg/context/request-headers';
import type { GenerateImageDTO } from '../../../application/dto/image.dto';
import type { GenerateImageRequest } from '../request/image.request';

export class ImageMapper {
  ToGenerateImageRequest(request: Request): GenerateImageRequest {
    const queryIndex = request.originalUrl.indexOf('?');
    return {
      size: String(request.params.size),
      background: request.params.background === undefined ? undefined : String(request.params.background),
      color: request.params.color === undefined ? undefined : String(request.params.color),
      type: request.params.type === undefined ? undefined : String(request.params.type),
      query: {
        queryString: queryIndex === -1 ? '' : request.originalUrl.slice(queryIndex),
        headers: collectHeaders(request),
      },
    };
  }
  ToGenerateImageDTO(request: GenerateImageRequest): GenerateImageDTO {
    return request;
  }
}
