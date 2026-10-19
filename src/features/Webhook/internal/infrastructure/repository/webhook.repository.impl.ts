import type { WebhookCommand, WebhookQuery, WebhookRepository } from '../../application/webhook.interface';
import type { DummyJsonGateway } from '../../../../../common/dummyjson/application/dummyjson.interface';
import { DummyJsonResourceRepositoryAdapter } from '../../../../../common/dummyjson/infrastructure/dummyjson-resource.repository';
export class WebhookRepositoryImpl implements WebhookRepository {
  private readonly forwardRequest: DummyJsonResourceRepositoryAdapter;
  constructor(gateway: DummyJsonGateway, basePath = '/webhook') {
    this.forwardRequest = new DummyJsonResourceRepositoryAdapter(gateway, basePath);
  }
  create(command: WebhookCommand) {
    return this.send('POST', '/create', command);
  }
  getWebhook(identifier: string, query: WebhookQuery) {
    return this.get(`/${encodeURIComponent(identifier)}`, query);
  }
  createWebhook(identifier: string, command: WebhookCommand) {
    return this.send('POST', `/${encodeURIComponent(identifier)}`, command);
  }
  replaceWebhook(identifier: string, command: WebhookCommand) {
    return this.send('PUT', `/${encodeURIComponent(identifier)}`, command);
  }
  updateWebhook(identifier: string, command: WebhookCommand) {
    return this.send('PATCH', `/${encodeURIComponent(identifier)}`, command);
  }
  deleteWebhook(identifier: string, command: WebhookCommand) {
    return this.send('DELETE', `/${encodeURIComponent(identifier)}`, command);
  }
  listRequests(identifier: string, query: WebhookQuery) {
    return this.get(`/${encodeURIComponent(identifier)}/requests`, query);
  }
  getRequest(identifier: string, requestId: string, query: WebhookQuery) {
    return this.get(`/${encodeURIComponent(identifier)}/requests/${encodeURIComponent(requestId)}`, query);
  }
  deleteRequest(identifier: string, requestId: string, command: WebhookCommand) {
    return this.send('DELETE', `/${encodeURIComponent(identifier)}/requests/${encodeURIComponent(requestId)}`, command);
  }

  private get(pathAndQuery: string, query: WebhookQuery) {
    return this.forwardRequest.forward({
      method: 'GET',
      pathAndQuery: `${pathAndQuery}${query.queryString}`,
      headers: query.headers,
    });
  }
  private send(method: 'POST' | 'PUT' | 'PATCH' | 'DELETE', pathAndQuery: string, command: WebhookCommand) {
    return this.forwardRequest.forward({ method, pathAndQuery, headers: command.headers, body: command.body });
  }
}
