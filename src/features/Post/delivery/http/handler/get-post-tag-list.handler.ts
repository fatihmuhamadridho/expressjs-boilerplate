import type { NextFunction, Request, Response } from 'express';
import { writeResponse } from '../../../../../pkg/httpresponse/success-response';
import type { GetPostTagListUseCaseInterface } from '../../../application/usecase/post.usecases';
import type { PostMapper } from '../mapper/post.mapper';

export class GetPostTagListHandler {
  constructor(
    private readonly useCase: GetPostTagListUseCaseInterface,
    private readonly mapper: PostMapper
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
