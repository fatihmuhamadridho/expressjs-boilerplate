import type { NextFunction, Request, Response } from 'express';
import { writeResponse } from '../../../../../pkg/httpresponse/success-response';
import type { GetCartDetailUseCaseInterface } from '../../../application/usecase/cart.usecases';
import type { CartMapper } from '../mapper/cart.mapper';

export class GetCartDetailHandler {
  constructor(
    private readonly useCase: GetCartDetailUseCaseInterface,
    private readonly mapper: CartMapper
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
