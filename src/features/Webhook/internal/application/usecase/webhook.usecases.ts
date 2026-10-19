import type { WebhookCommandDTO, WebhookQueryDTO, WebhookResultDTO } from '../dto/webhook.dto';
import type { WebhookRepository } from '../webhook.interface';

export class WebhookUseCases {
  constructor(private readonly repository: WebhookRepository) {}
  create(command: WebhookCommandDTO): Promise<WebhookResultDTO> {
    return this.repository.create(command);
  }
  getWebhook(identifier: string, query: WebhookQueryDTO): Promise<WebhookResultDTO> {
    return this.repository.getWebhook(identifier, query);
  }
  createWebhook(identifier: string, command: WebhookCommandDTO): Promise<WebhookResultDTO> {
    return this.repository.createWebhook(identifier, command);
  }
  replaceWebhook(identifier: string, command: WebhookCommandDTO): Promise<WebhookResultDTO> {
    return this.repository.replaceWebhook(identifier, command);
  }
  updateWebhook(identifier: string, command: WebhookCommandDTO): Promise<WebhookResultDTO> {
    return this.repository.updateWebhook(identifier, command);
  }
  deleteWebhook(identifier: string, command: WebhookCommandDTO): Promise<WebhookResultDTO> {
    return this.repository.deleteWebhook(identifier, command);
  }
  listRequests(identifier: string, query: WebhookQueryDTO): Promise<WebhookResultDTO> {
    return this.repository.listRequests(identifier, query);
  }
  getRequest(identifier: string, requestId: string, query: WebhookQueryDTO): Promise<WebhookResultDTO> {
    return this.repository.getRequest(identifier, requestId, query);
  }
  deleteRequest(identifier: string, requestId: string, command: WebhookCommandDTO): Promise<WebhookResultDTO> {
    return this.repository.deleteRequest(identifier, requestId, command);
  }
}
