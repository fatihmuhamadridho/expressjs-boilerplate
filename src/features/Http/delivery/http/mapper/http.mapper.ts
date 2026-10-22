import type { Request } from 'express';
import { collectHeaders } from '../../../../../pkg/context/request-headers';
import type { HttpQueryDTO } from '../../../application/dto/http.dto';
import type { HttpQueryRequest } from '../request/http.request';

export class HttpMapper {
  ToQueryRequest(request: Request): HttpQueryRequest {
    const queryIndex = request.originalUrl.indexOf('?');
    return {
      queryString: queryIndex === -1 ? '' : request.originalUrl.slice(queryIndex),
      headers: collectHeaders(request),
    };
  }
  ToQueryDTO(request: HttpQueryRequest): HttpQueryDTO {
    return request;
  }
}
