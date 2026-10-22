import type { ResourceResult } from '../../../../pkg/httpclient/http-client';

export interface WebhookQuery {
  queryString: string;
  headers: Readonly<Record<string, string>>;
}

export interface WebhookCommand {
  queryString?: string;
  headers: Readonly<Record<string, string>>;
  body?: Uint8Array;
}

export interface WebhookRepository {
  create(command: WebhookCommand): Promise<ResourceResult>;
  getWebhook(identifier: string, query: WebhookQuery): Promise<ResourceResult>;
  createWebhook(identifier: string, command: WebhookCommand): Promise<ResourceResult>;
  replaceWebhook(identifier: string, command: WebhookCommand): Promise<ResourceResult>;
  updateWebhook(identifier: string, command: WebhookCommand): Promise<ResourceResult>;
  deleteWebhook(identifier: string, command: WebhookCommand): Promise<ResourceResult>;
  listRequests(identifier: string, query: WebhookQuery): Promise<ResourceResult>;
  getRequest(identifier: string, requestId: string, query: WebhookQuery): Promise<ResourceResult>;
  deleteRequest(identifier: string, requestId: string, command: WebhookCommand): Promise<ResourceResult>;
}
