import type { NextFunction, Request, Response } from 'express';
import { writeResponse } from '../../../../../pkg/httpresponse/success-response';
import type { GetPostByUserIdUseCaseInterface } from '../../../application/usecase/post.usecases';
import type { PostMapper } from '../mapper/post.mapper';

export class GetPostByUserIdHandler {
  constructor(
    private readonly useCase: GetPostByUserIdUseCaseInterface,
    private readonly mapper: PostMapper
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
