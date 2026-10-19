import type { Request } from 'express';
import { collectHeaders } from '../../../../../../common/dummyjson/delivery/dummyjson-proxy.runtime';
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
    return { headers: collectHeaders(request), body: Buffer.isBuffer(request.body) ? request.body : undefined };
  }

  ToCommandDTO(request: PostCommandRequest): PostCommandDTO {
    return request;
  }
}
