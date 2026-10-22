import type { Request } from 'express';
import { collectHeaders } from '../../../../../pkg/context/request-headers';
import type { AuthCommandDTO, AuthQueryDTO } from '../../../application/dto/auth.dto';
import type { AuthCommandRequest, AuthQueryRequest } from '../request/auth.request';

export class AuthMapper {
  ToQueryRequest(request: Request): AuthQueryRequest {
    const queryIndex = request.originalUrl.indexOf('?');
    return {
      queryString: queryIndex === -1 ? '' : request.originalUrl.slice(queryIndex),
      headers: collectHeaders(request),
    };
  }

  ToQueryDTO(request: AuthQueryRequest): AuthQueryDTO {
    return request;
  }

  ToCommandRequest(request: Request): AuthCommandRequest {
    return {
      queryString: request.originalUrl.includes('?') ? request.originalUrl.slice(request.originalUrl.indexOf('?')) : '',
      headers: collectHeaders(request),
      body: Buffer.isBuffer(request.body) ? request.body : undefined,
    };
  }

  ToCommandDTO(request: AuthCommandRequest): AuthCommandDTO {
    return request;
  }
}
