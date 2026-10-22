import type { NextFunction, Request, Response } from 'express';
import { writeResponse } from '../../../../../pkg/httpresponse/success-response';
import type { GetPostByTagUseCaseInterface } from '../../../application/usecase/post.usecases';
import type { PostMapper } from '../mapper/post.mapper';

export class GetPostByTagHandler {
  constructor(
    private readonly useCase: GetPostByTagUseCaseInterface,
    private readonly mapper: PostMapper
  ) {}

  Handle = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
    try {
      const result = await this.useCase.Execute(
        String(request.params.tag),
        this.mapper.ToQueryDTO(this.mapper.ToQueryRequest(request))
      );
      writeResponse(response, result);
    } catch (error) {
      next(error);
    }
  };
}
