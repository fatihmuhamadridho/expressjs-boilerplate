import type { Request } from 'express';
import { collectHeaders } from '../../../../../../common/dummyjson/delivery/dummyjson-proxy.runtime';
import type { CartCommandDTO, CartQueryDTO } from '../../../application/dto/cart.dto';
import type { CartCommandRequest, CartQueryRequest } from '../request/cart.request';
export class CartMapper {
  ToQueryRequest(request: Request): CartQueryRequest {
    const queryIndex = request.originalUrl.indexOf('?');
    return {
      queryString: queryIndex === -1 ? '' : request.originalUrl.slice(queryIndex),
      headers: collectHeaders(request),
    };
  }
  ToQueryDTO(request: CartQueryRequest): CartQueryDTO {
    return request;
  }
  ToCommandRequest(request: Request): CartCommandRequest {
    return { headers: collectHeaders(request), body: Buffer.isBuffer(request.body) ? request.body : undefined };
  }
  ToCommandDTO(request: CartCommandRequest): CartCommandDTO {
    return request;
  }
}
