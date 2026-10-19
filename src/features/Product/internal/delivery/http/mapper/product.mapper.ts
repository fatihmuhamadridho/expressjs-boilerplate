import type { Request } from 'express';
import { collectHeaders } from '../../../../../../common/dummyjson/delivery/dummyjson-proxy.runtime';
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
      headers: collectHeaders(request),
      body: Buffer.isBuffer(request.body) ? request.body : undefined,
    };
  }

  ToCommandDTO(request: ProductCommandRequest): ProductCommandDTO {
    return { headers: request.headers, body: request.body };
  }
}
