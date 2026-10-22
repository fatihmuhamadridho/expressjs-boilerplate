import type { Request } from 'express';
import { collectHeaders } from '../../../../../pkg/context/request-headers';
import type { IconQueryDTO } from '../../../application/dto/icon.dto';
import type { IconQueryRequest } from '../request/icon.request';

export class IconMapper {
  ToQueryRequest(request: Request): IconQueryRequest {
    const queryIndex = request.originalUrl.indexOf('?');
    return {
      queryString: queryIndex === -1 ? '' : request.originalUrl.slice(queryIndex),
      headers: collectHeaders(request),
    };
  }
  ToQueryDTO(request: IconQueryRequest): IconQueryDTO {
    return request;
  }
}
