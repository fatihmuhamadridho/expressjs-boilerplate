import type { Request } from 'express';
import { collectHeaders } from '../../../../../pkg/context/request-headers';
import type { ProductCommandDTO, ProductQueryDTO } from '../../../application/dto/product.dto';
import type { ProductCommandRequest, ProductQueryRequest } from '../request/product.request';

export class ProductMapper {
  ToQueryRequest(request: Request): ProductQueryRequest {
    const queryIndex = request.originalUrl.indexOf('?');
    return {
      queryString: queryIndex === -1 ? '' : request.originalUrl.slice(queryIndex),
      headers: collectHeaders(request),
    };
  }

  ToQueryDTO(request: ProductQueryRequest): ProductQueryDTO {
    return request;
  }

  ToCommandRequest(request: Request): ProductCommandRequest {
    return {
      queryString: request.originalUrl.includes('?') ? request.originalUrl.slice(request.originalUrl.indexOf('?')) : '',
      headers: collectHeaders(request),
      body: Buffer.isBuffer(request.body) ? request.body : undefined,
    };
  }

  ToCommandDTO(request: ProductCommandRequest): ProductCommandDTO {
    return request;
  }
}
