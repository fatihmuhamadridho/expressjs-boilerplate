import type { NextFunction, Request, Response } from 'express';
import { writeResponse } from '../../../../../pkg/httpresponse/success-response';
import type { GetCustomResponseByIdentifierUseCaseInterface } from '../../../application/usecase/custom-response.usecases';
import type { CustomResponseMapper } from '../mapper/custom-response.mapper';

export class GetCustomResponseByIdentifierHandler {
  constructor(
    private readonly useCase: GetCustomResponseByIdentifierUseCaseInterface,
    private readonly mapper: CustomResponseMapper
  ) {}

  Handle = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
    try {
      const result = await this.useCase.Execute(
        String(request.params.identifier),
        this.mapper.ToQueryDTO(this.mapper.ToQueryRequest(request))
      );
      writeResponse(response, result);
    } catch (error) {
      next(error);
    }
  };
}
