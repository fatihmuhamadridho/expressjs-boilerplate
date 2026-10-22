import type { WebhookCommandDTO, WebhookResultDTO } from '../dto/webhook.dto';
import type { WebhookRepository } from '../../domain/repository/webhook.repository';

export interface ReplaceNamedWebhookUseCaseInterface {
  Execute(identifier: string, command: WebhookCommandDTO): Promise<WebhookResultDTO>;
}

export class ReplaceNamedWebhookUseCase implements ReplaceNamedWebhookUseCaseInterface {
  constructor(private readonly repository: WebhookRepository) {}

  Execute(identifier: string, command: WebhookCommandDTO): Promise<WebhookResultDTO> {
    return this.repository.replaceWebhook(identifier, command);
  }
}
