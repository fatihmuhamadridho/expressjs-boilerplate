import type { NextFunction, Request, Response } from 'express';
import { writeResponse } from '../../../../../pkg/httpresponse/success-response';
import type { GetRequestWebhookUseCaseInterface } from '../../../application/usecase/webhook.usecases';
import type { WebhookMapper } from '../mapper/webhook.mapper';

export class GetRequestWebhookHandler {
  constructor(
    private readonly useCase: GetRequestWebhookUseCaseInterface,
    private readonly mapper: WebhookMapper
  ) {}

  Handle = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
    try {
      const result = await this.useCase.Execute(
        String(request.params.identifier),
        String(request.params.requestId),
        this.mapper.ToQueryDTO(this.mapper.ToQueryRequest(request))
      );
      writeResponse(response, result);
    } catch (error) {
      next(error);
    }
  };
}
