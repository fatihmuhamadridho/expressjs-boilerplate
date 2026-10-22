import type { WebhookQueryDTO, WebhookResultDTO } from '../dto/webhook.dto';
import type { WebhookRepository } from '../../domain/repository/webhook.repository';

export interface ListRequestsWebhookUseCaseInterface {
  Execute(identifier: string, query: WebhookQueryDTO): Promise<WebhookResultDTO>;
}

export class ListRequestsWebhookUseCase implements ListRequestsWebhookUseCaseInterface {
  constructor(private readonly repository: WebhookRepository) {}

  Execute(identifier: string, query: WebhookQueryDTO): Promise<WebhookResultDTO> {
    return this.repository.listRequests(identifier, query);
  }
}
