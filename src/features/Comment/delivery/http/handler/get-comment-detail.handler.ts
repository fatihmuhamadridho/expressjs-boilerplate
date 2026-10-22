import type { NextFunction, Request, Response } from 'express';
import { writeResponse } from '../../../../../pkg/httpresponse/success-response';
import type { GetCommentDetailUseCaseInterface } from '../../../application/usecase/comment.usecases';
import type { CommentMapper } from '../mapper/comment.mapper';

export class GetCommentDetailHandler {
  constructor(
    private readonly useCase: GetCommentDetailUseCaseInterface,
    private readonly mapper: CommentMapper
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
