import type { WebhookQueryDTO, WebhookResultDTO } from '../dto/webhook.dto';
import type { WebhookRepository } from '../../domain/repository/webhook.repository';

export interface GetRequestWebhookUseCaseInterface {
  Execute(identifier: string, requestId: string, query: WebhookQueryDTO): Promise<WebhookResultDTO>;
}

export class GetRequestWebhookUseCase implements GetRequestWebhookUseCaseInterface {
  constructor(private readonly repository: WebhookRepository) {}

  Execute(identifier: string, requestId: string, query: WebhookQueryDTO): Promise<WebhookResultDTO> {
    return this.repository.getRequest(identifier, requestId, query);
  }
}
