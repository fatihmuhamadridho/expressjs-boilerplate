import type { NextFunction, Request, Response } from 'express';
import { writeResponse } from '../../../../../pkg/httpresponse/success-response';
import type { GetProductsByCategoryUseCaseInterface } from '../../../application/usecase/product.usecases';
import type { ProductMapper } from '../mapper/product.mapper';

export class GetProductsByCategoryHandler {
  constructor(
    private readonly useCase: GetProductsByCategoryUseCaseInterface,
    private readonly mapper: ProductMapper
  ) {}

  Handle = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
    try {
      const result = await this.useCase.Execute(
        String(request.params.category),
        this.mapper.ToQueryDTO(this.mapper.ToQueryRequest(request))
      );
      writeResponse(response, result);
    } catch (error) {
      next(error);
    }
  };
}
