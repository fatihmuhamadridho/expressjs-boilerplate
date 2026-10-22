import type { WebhookCommandDTO, WebhookResultDTO } from '../dto/webhook.dto';
import type { WebhookRepository } from '../../domain/repository/webhook.repository';

export interface CreateNamedWebhookUseCaseInterface {
  Execute(identifier: string, command: WebhookCommandDTO): Promise<WebhookResultDTO>;
}

export class CreateNamedWebhookUseCase implements CreateNamedWebhookUseCaseInterface {
  constructor(private readonly repository: WebhookRepository) {}

  Execute(identifier: string, command: WebhookCommandDTO): Promise<WebhookResultDTO> {
    return this.repository.createWebhook(identifier, command);
  }
}
