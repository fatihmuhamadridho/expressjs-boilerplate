import type { Request } from 'express';
import { collectHeaders } from '../../../../../pkg/context/request-headers';
import type { IpQueryDTO } from '../../../application/dto/ip.dto';
import type { IpQueryRequest } from '../request/ip.request';

export class IpMapper {
  ToQueryRequest(request: Request): IpQueryRequest {
    const queryIndex = request.originalUrl.indexOf('?');
    return {
      queryString: queryIndex === -1 ? '' : request.originalUrl.slice(queryIndex),
      headers: collectHeaders(request),
    };
  }
  ToQueryDTO(request: IpQueryRequest): IpQueryDTO {
    return request;
  }
}
