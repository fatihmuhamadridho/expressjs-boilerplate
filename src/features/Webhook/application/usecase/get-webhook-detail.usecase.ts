import type { WebhookQueryDTO, WebhookResultDTO } from '../dto/webhook.dto';
import type { WebhookRepository } from '../../domain/repository/webhook.repository';

export interface GetWebhookDetailUseCaseInterface {
  Execute(identifier: string, query: WebhookQueryDTO): Promise<WebhookResultDTO>;
}

export class GetWebhookDetailUseCase implements GetWebhookDetailUseCaseInterface {
  constructor(private readonly repository: WebhookRepository) {}

  Execute(identifier: string, query: WebhookQueryDTO): Promise<WebhookResultDTO> {
    return this.repository.getWebhook(identifier, query);
  }
}
