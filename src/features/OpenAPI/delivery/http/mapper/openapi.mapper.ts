import type { Request } from 'express';
import { collectHeaders } from '../../../../../pkg/context/request-headers';
import type { OpenAPIQueryDTO } from '../../../application/dto/openapi.dto';
import type { OpenAPIQueryRequest } from '../request/openapi.request';

export class OpenAPIMapper {
  ToQueryRequest(request: Request): OpenAPIQueryRequest {
    const queryIndex = request.originalUrl.indexOf('?');
    return {
      queryString: queryIndex === -1 ? '' : request.originalUrl.slice(queryIndex),
      headers: collectHeaders(request),
    };
  }
  ToQueryDTO(request: OpenAPIQueryRequest): OpenAPIQueryDTO {
    return request;
  }
}
