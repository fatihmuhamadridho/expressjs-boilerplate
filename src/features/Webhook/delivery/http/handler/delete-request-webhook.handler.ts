import type { NextFunction, Request, Response } from 'express';
import { writeResponse } from '../../../../../pkg/httpresponse/success-response';
import type { DeleteRequestWebhookUseCaseInterface } from '../../../application/usecase/webhook.usecases';
import type { WebhookMapper } from '../mapper/webhook.mapper';

export class DeleteRequestWebhookHandler {
  constructor(
    private readonly useCase: DeleteRequestWebhookUseCaseInterface,
    private readonly mapper: WebhookMapper
  ) {}

  Handle = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
    try {
      const result = await this.useCase.Execute(
        String(request.params.identifier),
        String(request.params.requestId),
        this.mapper.ToCommandDTO(this.mapper.ToCommandRequest(request))
      );
      writeResponse(response, result);
    } catch (error) {
      next(error);
    }
  };
}
