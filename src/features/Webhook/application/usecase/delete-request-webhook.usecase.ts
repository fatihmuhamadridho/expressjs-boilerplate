import type { WebhookCommandDTO, WebhookResultDTO } from '../dto/webhook.dto';
import type { WebhookRepository } from '../../domain/repository/webhook.repository';

export interface DeleteRequestWebhookUseCaseInterface {
  Execute(identifier: string, requestId: string, command: WebhookCommandDTO): Promise<WebhookResultDTO>;
}

export class DeleteRequestWebhookUseCase implements DeleteRequestWebhookUseCaseInterface {
  constructor(private readonly repository: WebhookRepository) {}

  Execute(identifier: string, requestId: string, command: WebhookCommandDTO): Promise<WebhookResultDTO> {
    return this.repository.deleteRequest(identifier, requestId, command);
  }
}
