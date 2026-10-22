import type { RequestHandler } from 'express';
import { GetHttpStatusHandler } from './get-http-status.handler';
import { GetHttpStatusMessageHandler } from './get-http-status-message.handler';
import type {
  GetHttpStatusUseCaseInterface,
  GetHttpStatusMessageUseCaseInterface,
} from '../../../application/usecase/http.usecases';
import type { HttpMapper } from '../mapper/http.mapper';

export interface HttpUseCases {
  getStatus: GetHttpStatusUseCaseInterface;
  getStatusMessage: GetHttpStatusMessageUseCaseInterface;
}

export class HttpHandler {
  readonly getStatus: RequestHandler;
  readonly getStatusMessage: RequestHandler;

  constructor(useCases: HttpUseCases, mapper: HttpMapper) {
    this.getStatus = new GetHttpStatusHandler(useCases.getStatus, mapper).Handle;
    this.getStatusMessage = new GetHttpStatusMessageHandler(useCases.getStatusMessage, mapper).Handle;
  }
}
