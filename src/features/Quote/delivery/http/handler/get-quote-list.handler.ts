import type { NextFunction, Request, Response } from 'express';
import { writeResponse } from '../../../../../pkg/httpresponse/success-response';
import type { GetQuoteListUseCaseInterface } from '../../../application/usecase/quote.usecases';
import type { QuoteMapper } from '../mapper/quote.mapper';

export class GetQuoteListHandler {
  constructor(
    private readonly useCase: GetQuoteListUseCaseInterface,
    private readonly mapper: QuoteMapper
  ) {}

  Handle = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
    try {
      const result = await this.useCase.Execute(this.mapper.ToQueryDTO(this.mapper.ToQueryRequest(request)));
      writeResponse(response, result);
    } catch (error) {
      next(error);
    }
  };
}
