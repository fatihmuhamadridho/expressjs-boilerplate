import type { Request } from 'express';
import { collectHeaders } from '../../../../../pkg/context/request-headers';
import type { RecipeCommandDTO, RecipeQueryDTO } from '../../../application/dto/recipe.dto';
import type { RecipeCommandRequest, RecipeQueryRequest } from '../request/recipe.request';

export class RecipeMapper {
  ToQueryRequest(request: Request): RecipeQueryRequest {
    const queryIndex = request.originalUrl.indexOf('?');
    return {
      queryString: queryIndex === -1 ? '' : request.originalUrl.slice(queryIndex),
      headers: collectHeaders(request),
    };
  }
  ToQueryDTO(request: RecipeQueryRequest): RecipeQueryDTO {
    return request;
  }
  ToCommandRequest(request: Request): RecipeCommandRequest {
    return {
      queryString: request.originalUrl.includes('?') ? request.originalUrl.slice(request.originalUrl.indexOf('?')) : '',
      headers: collectHeaders(request),
      body: Buffer.isBuffer(request.body) ? request.body : undefined,
    };
  }
  ToCommandDTO(request: RecipeCommandRequest): RecipeCommandDTO {
    return request;
  }
}
