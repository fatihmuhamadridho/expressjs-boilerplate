import type { Request } from 'express';
import { collectHeaders } from '../../../../../pkg/context/request-headers';
import type { PostCommandDTO, PostQueryDTO } from '../../../application/dto/post.dto';
import type { PostCommandRequest, PostQueryRequest } from '../request/post.request';

export class PostMapper {
  ToQueryRequest(request: Request): PostQueryRequest {
    const queryIndex = request.originalUrl.indexOf('?');
    return {
      queryString: queryIndex === -1 ? '' : request.originalUrl.slice(queryIndex),
      headers: collectHeaders(request),
    };
  }

  ToQueryDTO(request: PostQueryRequest): PostQueryDTO {
    return request;
  }

  ToCommandRequest(request: Request): PostCommandRequest {
    return {
      queryString: request.originalUrl.includes('?') ? request.originalUrl.slice(request.originalUrl.indexOf('?')) : '',
      headers: collectHeaders(request),
      body: Buffer.isBuffer(request.body) ? request.body : undefined,
    };
  }

  ToCommandDTO(request: PostCommandRequest): PostCommandDTO {
    return request;
  }
}
