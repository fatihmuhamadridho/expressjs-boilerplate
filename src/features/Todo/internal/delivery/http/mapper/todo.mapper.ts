import type { Request } from 'express';
import { collectHeaders } from '../../../../../../common/dummyjson/delivery/dummyjson-proxy.runtime';
import type { TodoCommandDTO, TodoQueryDTO } from '../../../application/dto/todo.dto';
import type { TodoCommandRequest, TodoQueryRequest } from '../request/todo.request';

export class TodoMapper {
  ToQueryRequest(request: Request): TodoQueryRequest {
    const queryIndex = request.originalUrl.indexOf('?');
    return {
      queryString: queryIndex === -1 ? '' : request.originalUrl.slice(queryIndex),
      headers: collectHeaders(request),
    };
  }
  ToQueryDTO(request: TodoQueryRequest): TodoQueryDTO {
    return request;
  }
  ToCommandRequest(request: Request): TodoCommandRequest {
    return { headers: collectHeaders(request), body: Buffer.isBuffer(request.body) ? request.body : undefined };
  }
  ToCommandDTO(request: TodoCommandRequest): TodoCommandDTO {
    return request;
  }
}
