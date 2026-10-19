import type { Request } from 'express';
import { collectHeaders } from '../../../../../../common/dummyjson/delivery/dummyjson-proxy.runtime';
import type { UserCommandDTO, UserQueryDTO } from '../../../application/dto/user.dto';
import type { UserCommandRequest, UserQueryRequest } from '../request/user.request';

export class UserMapper {
  ToQueryRequest(request: Request): UserQueryRequest {
    const queryIndex = request.originalUrl.indexOf('?');
    return {
      queryString: queryIndex === -1 ? '' : request.originalUrl.slice(queryIndex),
      headers: collectHeaders(request),
    };
  }
  ToQueryDTO(request: UserQueryRequest): UserQueryDTO {
    return request;
  }
  ToCommandRequest(request: Request): UserCommandRequest {
    return { headers: collectHeaders(request), body: Buffer.isBuffer(request.body) ? request.body : undefined };
  }
  ToCommandDTO(request: UserCommandRequest): UserCommandDTO {
    return request;
  }
}
