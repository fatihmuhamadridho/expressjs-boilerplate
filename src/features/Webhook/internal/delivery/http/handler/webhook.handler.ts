import type { NextFunction, Request, Response } from 'express';
import {
  DummyJsonGatewayError,
  type DummyJsonResponse,
} from '../../../../../../common/dummyjson/application/dummyjson.interface';
import { writeDummyJsonResponse } from '../../../../../../common/dummyjson/delivery/write-response';
import type { WebhookUseCases } from '../../../application/usecase/webhook.usecases';
import { WebhookMapper } from '../mapper/webhook.mapper';

export class WebhookHandler {
  constructor(
    private readonly useCases: WebhookUseCases,
    private readonly mapper: WebhookMapper
  ) {}
  private execute =
    (work: (request: Request) => Promise<DummyJsonResponse>) =>
    async (request: Request, response: Response, next: NextFunction): Promise<void> => {
      try {
        writeDummyJsonResponse(response, await work(request));
      } catch (error) {
        if (error instanceof DummyJsonGatewayError) {
          response.status(error.kind === 'timeout' ? 504 : 502).json({ message: error.message });
          return;
        }
        next(error);
      }
    };
  create = this.execute((r) => this.useCases.create(this.mapper.ToCommandDTO(this.mapper.ToCommandRequest(r))));
  getWebhook = this.execute((r) =>
    this.useCases.getWebhook(String(r.params.identifier), this.mapper.ToQueryDTO(this.mapper.ToQueryRequest(r)))
  );
  createWebhook = this.execute((r) =>
    this.useCases.createWebhook(String(r.params.identifier), this.mapper.ToCommandDTO(this.mapper.ToCommandRequest(r)))
  );
  replaceWebhook = this.execute((r) =>
    this.useCases.replaceWebhook(String(r.params.identifier), this.mapper.ToCommandDTO(this.mapper.ToCommandRequest(r)))
  );
  updateWebhook = this.execute((r) =>
    this.useCases.updateWebhook(String(r.params.identifier), this.mapper.ToCommandDTO(this.mapper.ToCommandRequest(r)))
  );
  deleteWebhook = this.execute((r) =>
    this.useCases.deleteWebhook(String(r.params.identifier), this.mapper.ToCommandDTO(this.mapper.ToCommandRequest(r)))
  );
  listRequests = this.execute((r) =>
    this.useCases.listRequests(String(r.params.identifier), this.mapper.ToQueryDTO(this.mapper.ToQueryRequest(r)))
  );
  getRequest = this.execute((r) =>
    this.useCases.getRequest(
      String(r.params.identifier),
      String(r.params.requestId),
      this.mapper.ToQueryDTO(this.mapper.ToQueryRequest(r))
    )
  );
  deleteRequest = this.execute((r) =>
    this.useCases.deleteRequest(
      String(r.params.identifier),
      String(r.params.requestId),
      this.mapper.ToCommandDTO(this.mapper.ToCommandRequest(r))
    )
  );
}
