import type { Request } from 'express';
import { collectHeaders } from '../../../../../pkg/context/request-headers';
import type { QuoteQueryDTO } from '../../../application/dto/quote.dto';
import type { QuoteQueryRequest } from '../request/quote.request';

export class QuoteMapper {
  ToQueryRequest(request: Request): QuoteQueryRequest {
    const queryIndex = request.originalUrl.indexOf('?');
    return {
      queryString: queryIndex === -1 ? '' : request.originalUrl.slice(queryIndex),
      headers: collectHeaders(request),
    };
  }
  ToQueryDTO(request: QuoteQueryRequest): QuoteQueryDTO {
    return request;
  }
}
