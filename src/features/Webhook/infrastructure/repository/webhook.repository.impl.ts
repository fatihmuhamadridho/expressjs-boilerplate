import type { WebhookCommand, WebhookQuery, WebhookRepository } from '../../domain/repository/webhook.repository';
import type { ResourceGateway, ResourceRequest, ResourceResult } from '../../../../pkg/httpclient/http-client';
export class WebhookRepositoryImpl implements WebhookRepository {
  constructor(
    private readonly gateway: ResourceGateway,
    private readonly basePath = '/webhook'
  ) {}
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
    return this.forward({
      method: 'GET',
      pathAndQuery: `${pathAndQuery}${query.queryString}`,
      headers: query.headers,
    });
  }
  private send(method: 'POST' | 'PUT' | 'PATCH' | 'DELETE', pathAndQuery: string, command: WebhookCommand) {
    return this.forward({
      method,
      pathAndQuery: `${pathAndQuery}${command.queryString ?? ''}`,
      headers: command.headers,
      body: command.body,
    });
  }

  private forward(request: ResourceRequest): Promise<ResourceResult> {
    const resourcePath =
      request.pathAndQuery === '/'
        ? ''
        : request.pathAndQuery.startsWith('/?')
          ? request.pathAndQuery.slice(1)
          : request.pathAndQuery;
    return this.gateway.forward({ ...request, pathAndQuery: `${this.basePath}${resourcePath}` });
  }
}
