import type { NextFunction, Request, Response } from 'express';
import { writeResponse } from '../../../../../pkg/httpresponse/success-response';
import type { GetQuoteDetailUseCaseInterface } from '../../../application/usecase/quote.usecases';
import type { QuoteMapper } from '../mapper/quote.mapper';

export class GetQuoteDetailHandler {
  constructor(
    private readonly useCase: GetQuoteDetailUseCaseInterface,
    private readonly mapper: QuoteMapper
  ) {}

  Handle = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
    try {
      const result = await this.useCase.Execute(
        String(request.params.id),
        this.mapper.ToQueryDTO(this.mapper.ToQueryRequest(request))
      );
      writeResponse(response, result);
    } catch (error) {
      next(error);
    }
  };
}
