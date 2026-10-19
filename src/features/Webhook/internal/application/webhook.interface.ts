import type { DummyJsonResponse } from '../../../../common/dummyjson/application/dummyjson.interface';

export interface WebhookQuery {
  queryString: string;
  headers: Readonly<Record<string, string>>;
}

export interface WebhookCommand {
  headers: Readonly<Record<string, string>>;
  body?: Uint8Array;
}

export interface WebhookRepository {
  create(command: WebhookCommand): Promise<DummyJsonResponse>;
  getWebhook(identifier: string, query: WebhookQuery): Promise<DummyJsonResponse>;
  createWebhook(identifier: string, command: WebhookCommand): Promise<DummyJsonResponse>;
  replaceWebhook(identifier: string, command: WebhookCommand): Promise<DummyJsonResponse>;
  updateWebhook(identifier: string, command: WebhookCommand): Promise<DummyJsonResponse>;
  deleteWebhook(identifier: string, command: WebhookCommand): Promise<DummyJsonResponse>;
  listRequests(identifier: string, query: WebhookQuery): Promise<DummyJsonResponse>;
  getRequest(identifier: string, requestId: string, query: WebhookQuery): Promise<DummyJsonResponse>;
  deleteRequest(identifier: string, requestId: string, command: WebhookCommand): Promise<DummyJsonResponse>;
}
