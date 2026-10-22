import type { NextFunction, Request, Response } from 'express';
import { writeResponse } from '../../../../../pkg/httpresponse/success-response';
import type { CreateCartUseCaseInterface } from '../../../application/usecase/cart.usecases';
import type { CartMapper } from '../mapper/cart.mapper';

export class CreateCartHandler {
  constructor(
    private readonly useCase: CreateCartUseCaseInterface,
    private readonly mapper: CartMapper
  ) {}

  Handle = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
    try {
      const result = await this.useCase.Execute(this.mapper.ToCommandDTO(this.mapper.ToCommandRequest(request)));
      writeResponse(response, result);
    } catch (error) {
      next(error);
    }
  };
}
