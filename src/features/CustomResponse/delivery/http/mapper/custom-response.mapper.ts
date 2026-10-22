import type { Request } from 'express';
import { collectHeaders } from '../../../../../pkg/context/request-headers';
import type { CustomResponseCommandDTO, CustomResponseQueryDTO } from '../../../application/dto/custom-response.dto';
import type { CustomResponseCommandRequest, CustomResponseQueryRequest } from '../request/custom-response.request';

export class CustomResponseMapper {
  ToQueryRequest(request: Request): CustomResponseQueryRequest {
    const queryIndex = request.originalUrl.indexOf('?');
    return {
      queryString: queryIndex === -1 ? '' : request.originalUrl.slice(queryIndex),
      headers: collectHeaders(request),
    };
  }
  ToQueryDTO(request: CustomResponseQueryRequest): CustomResponseQueryDTO {
    return request;
  }
  ToCommandRequest(request: Request): CustomResponseCommandRequest {
    return {
      queryString: request.originalUrl.includes('?') ? request.originalUrl.slice(request.originalUrl.indexOf('?')) : '',
      headers: collectHeaders(request),
      body: Buffer.isBuffer(request.body) ? request.body : undefined,
    };
  }
  ToCommandDTO(request: CustomResponseCommandRequest): CustomResponseCommandDTO {
    return request;
  }
}
