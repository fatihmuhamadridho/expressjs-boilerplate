import type { Request } from 'express';
import { collectHeaders } from '../../../../../pkg/context/request-headers';
import type { WebhookCommandDTO, WebhookQueryDTO } from '../../../application/dto/webhook.dto';
import type { WebhookCommandRequest, WebhookQueryRequest } from '../request/webhook.request';

export class WebhookMapper {
  ToQueryRequest(request: Request): WebhookQueryRequest {
    const queryIndex = request.originalUrl.indexOf('?');
    return {
      queryString: queryIndex === -1 ? '' : request.originalUrl.slice(queryIndex),
      headers: collectHeaders(request),
    };
  }
  ToQueryDTO(request: WebhookQueryRequest): WebhookQueryDTO {
    return request;
  }
  ToCommandRequest(request: Request): WebhookCommandRequest {
    return {
      queryString: request.originalUrl.includes('?') ? request.originalUrl.slice(request.originalUrl.indexOf('?')) : '',
      headers: collectHeaders(request),
      body: Buffer.isBuffer(request.body) ? request.body : undefined,
    };
  }
  ToCommandDTO(request: WebhookCommandRequest): WebhookCommandDTO {
    return request;
  }
}
