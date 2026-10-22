import type { WebhookCommandDTO, WebhookResultDTO } from '../dto/webhook.dto';
import type { WebhookRepository } from '../../domain/repository/webhook.repository';

export interface UpdateNamedWebhookUseCaseInterface {
  Execute(identifier: string, command: WebhookCommandDTO): Promise<WebhookResultDTO>;
}

export class UpdateNamedWebhookUseCase implements UpdateNamedWebhookUseCaseInterface {
  constructor(private readonly repository: WebhookRepository) {}

  Execute(identifier: string, command: WebhookCommandDTO): Promise<WebhookResultDTO> {
    return this.repository.updateWebhook(identifier, command);
  }
}
