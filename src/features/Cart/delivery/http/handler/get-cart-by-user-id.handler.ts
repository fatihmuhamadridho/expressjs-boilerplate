import type { NextFunction, Request, Response } from 'express';
import { writeResponse } from '../../../../../pkg/httpresponse/success-response';
import type { GetCartByUserIdUseCaseInterface } from '../../../application/usecase/cart.usecases';
import type { CartMapper } from '../mapper/cart.mapper';

export class GetCartByUserIdHandler {
  constructor(
    private readonly useCase: GetCartByUserIdUseCaseInterface,
    private readonly mapper: CartMapper
  ) {}

  Handle = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
    try {
      const result = await this.useCase.Execute(
        String(request.params.userId),
        this.mapper.ToQueryDTO(this.mapper.ToQueryRequest(request))
      );
      writeResponse(response, result);
    } catch (error) {
      next(error);
    }
  };
}
