import type { Request } from 'express';
import { collectHeaders } from '../../../../../../common/dummyjson/delivery/dummyjson-proxy.runtime';
import type { CommentCommandDTO, CommentQueryDTO } from '../../../application/dto/comment.dto';
import type { CommentCommandRequest, CommentQueryRequest } from '../request/comment.request';

export class CommentMapper {
  ToQueryRequest(request: Request): CommentQueryRequest {
    const queryIndex = request.originalUrl.indexOf('?');
    return {
      queryString: queryIndex === -1 ? '' : request.originalUrl.slice(queryIndex),
      headers: collectHeaders(request),
    };
  }
  ToQueryDTO(request: CommentQueryRequest): CommentQueryDTO {
    return request;
  }
  ToCommandRequest(request: Request): CommentCommandRequest {
    return { headers: collectHeaders(request), body: Buffer.isBuffer(request.body) ? request.body : undefined };
  }
  ToCommandDTO(request: CommentCommandRequest): CommentCommandDTO {
    return request;
  }
}
