import type { NextFunction, Request, Response } from 'express';
import { writeResponse } from '../../../../../pkg/httpresponse/success-response';
import type { ReplaceCartUseCaseInterface } from '../../../application/usecase/cart.usecases';
import type { CartMapper } from '../mapper/cart.mapper';

export class ReplaceCartHandler {
  constructor(
    private readonly useCase: ReplaceCartUseCaseInterface,
    private readonly mapper: CartMapper
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
