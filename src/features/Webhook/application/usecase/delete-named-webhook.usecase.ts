import type { WebhookCommandDTO, WebhookResultDTO } from '../dto/webhook.dto';
import type { WebhookRepository } from '../../domain/repository/webhook.repository';

export interface DeleteNamedWebhookUseCaseInterface {
  Execute(identifier: string, command: WebhookCommandDTO): Promise<WebhookResultDTO>;
}

export class DeleteNamedWebhookUseCase implements DeleteNamedWebhookUseCaseInterface {
  constructor(private readonly repository: WebhookRepository) {}

  Execute(identifier: string, command: WebhookCommandDTO): Promise<WebhookResultDTO> {
    return this.repository.deleteWebhook(identifier, command);
  }
}
