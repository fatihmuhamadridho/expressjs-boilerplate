import type { Request } from 'express';
import { collectHeaders } from '../../../../../pkg/context/request-headers';
import type { TestCommandDTO, TestQueryDTO } from '../../../application/dto/test.dto';
import type { TestCommandRequest, TestQueryRequest } from '../request/test.request';

export class TestMapper {
  ToQueryRequest(request: Request): TestQueryRequest {
    const queryIndex = request.originalUrl.indexOf('?');
    return {
      queryString: queryIndex === -1 ? '' : request.originalUrl.slice(queryIndex),
      headers: collectHeaders(request),
    };
  }
  ToQueryDTO(request: TestQueryRequest): TestQueryDTO {
    return request;
  }
  ToCommandRequest(request: Request): TestCommandRequest {
    return {
      queryString: request.originalUrl.includes('?') ? request.originalUrl.slice(request.originalUrl.indexOf('?')) : '',
      headers: collectHeaders(request),
      body: Buffer.isBuffer(request.body) ? request.body : undefined,
    };
  }
  ToCommandDTO(request: TestCommandRequest): TestCommandDTO {
    return request;
  }
}
