import type { NextFunction, Request, Response } from 'express';
import { writeResponse } from '../../../../../pkg/httpresponse/success-response';
import type { ReplaceProductUseCaseInterface } from '../../../application/usecase/product.usecases';
import type { ProductMapper } from '../mapper/product.mapper';

export class ReplaceProductHandler {
  constructor(
    private readonly useCase: ReplaceProductUseCaseInterface,
    private readonly mapper: ProductMapper
  ) {}

  Handle = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
    try {
      const result = await this.useCase.Execute(
        String(request.params.id),
        this.mapper.ToCommandDTO(this.mapper.ToCommandRequest(request))
      );
      writeResponse(response, result);
    } catch (error) {
      next(error);
    }
  };
}
