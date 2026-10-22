import type { RequestHandler } from 'express';
import { CreateWebhookHandler } from './create-webhook.handler';
import { GetWebhookDetailHandler } from './get-webhook-detail.handler';
import { CreateNamedWebhookHandler } from './create-named-webhook.handler';
import { ReplaceNamedWebhookHandler } from './replace-named-webhook.handler';
import { UpdateNamedWebhookHandler } from './update-named-webhook.handler';
import { DeleteNamedWebhookHandler } from './delete-named-webhook.handler';
import { ListRequestsWebhookHandler } from './list-requests-webhook.handler';
import { GetRequestWebhookHandler } from './get-request-webhook.handler';
import { DeleteRequestWebhookHandler } from './delete-request-webhook.handler';
import type {
  CreateWebhookUseCaseInterface,
  GetWebhookDetailUseCaseInterface,
  CreateNamedWebhookUseCaseInterface,
  ReplaceNamedWebhookUseCaseInterface,
  UpdateNamedWebhookUseCaseInterface,
  DeleteNamedWebhookUseCaseInterface,
  ListRequestsWebhookUseCaseInterface,
  GetRequestWebhookUseCaseInterface,
  DeleteRequestWebhookUseCaseInterface,
} from '../../../application/usecase/webhook.usecases';
import type { WebhookMapper } from '../mapper/webhook.mapper';

export interface WebhookUseCases {
  create: CreateWebhookUseCaseInterface;
  getWebhook: GetWebhookDetailUseCaseInterface;
  createWebhook: CreateNamedWebhookUseCaseInterface;
  replaceWebhook: ReplaceNamedWebhookUseCaseInterface;
  updateWebhook: UpdateNamedWebhookUseCaseInterface;
  deleteWebhook: DeleteNamedWebhookUseCaseInterface;
  listRequests: ListRequestsWebhookUseCaseInterface;
  getRequest: GetRequestWebhookUseCaseInterface;
  deleteRequest: DeleteRequestWebhookUseCaseInterface;
}

export class WebhookHandler {
  readonly create: RequestHandler;
  readonly getWebhook: RequestHandler;
  readonly createWebhook: RequestHandler;
  readonly replaceWebhook: RequestHandler;
  readonly updateWebhook: RequestHandler;
  readonly deleteWebhook: RequestHandler;
  readonly listRequests: RequestHandler;
  readonly getRequest: RequestHandler;
  readonly deleteRequest: RequestHandler;

  constructor(useCases: WebhookUseCases, mapper: WebhookMapper) {
    this.create = new CreateWebhookHandler(useCases.create, mapper).Handle;
    this.getWebhook = new GetWebhookDetailHandler(useCases.getWebhook, mapper).Handle;
    this.createWebhook = new CreateNamedWebhookHandler(useCases.createWebhook, mapper).Handle;
    this.replaceWebhook = new ReplaceNamedWebhookHandler(useCases.replaceWebhook, mapper).Handle;
    this.updateWebhook = new UpdateNamedWebhookHandler(useCases.updateWebhook, mapper).Handle;
    this.deleteWebhook = new DeleteNamedWebhookHandler(useCases.deleteWebhook, mapper).Handle;
    this.listRequests = new ListRequestsWebhookHandler(useCases.listRequests, mapper).Handle;
    this.getRequest = new GetRequestWebhookHandler(useCases.getRequest, mapper).Handle;
    this.deleteRequest = new DeleteRequestWebhookHandler(useCases.deleteRequest, mapper).Handle;
  }
}
