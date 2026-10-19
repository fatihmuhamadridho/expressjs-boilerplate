import type { Request } from 'express';
import { collectHeaders } from '../../../../../../common/dummyjson/delivery/dummyjson-proxy.runtime';
import type { TwoFactorCommandDTO, TwoFactorQueryDTO } from '../../../application/dto/two-factor.dto';
import type { TwoFactorCommandRequest, TwoFactorQueryRequest } from '../request/two-factor.request';

export class TwoFactorMapper {
  ToQueryRequest(request: Request): TwoFactorQueryRequest {
    const queryIndex = request.originalUrl.indexOf('?');
    return {
      queryString: queryIndex === -1 ? '' : request.originalUrl.slice(queryIndex),
      headers: collectHeaders(request),
    };
  }
  ToQueryDTO(request: TwoFactorQueryRequest): TwoFactorQueryDTO {
    return request;
  }
  ToCommandRequest(request: Request): TwoFactorCommandRequest {
    return { headers: collectHeaders(request), body: Buffer.isBuffer(request.body) ? request.body : undefined };
  }
  ToCommandDTO(request: TwoFactorCommandRequest): TwoFactorCommandDTO {
    return request;
  }
}
