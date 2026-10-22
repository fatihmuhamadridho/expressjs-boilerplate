import type { WebhookCommandDTO, WebhookResultDTO } from '../dto/webhook.dto';
import type { WebhookRepository } from '../../domain/repository/webhook.repository';

export interface CreateWebhookUseCaseInterface {
  Execute(command: WebhookCommandDTO): Promise<WebhookResultDTO>;
}

export class CreateWebhookUseCase implements CreateWebhookUseCaseInterface {
  constructor(private readonly repository: WebhookRepository) {}

  Execute(command: WebhookCommandDTO): Promise<WebhookResultDTO> {
    return this.repository.create(command);
  }
}
