import type { NextFunction, Request, Response } from 'express';
import { writeResponse } from '../../../../../pkg/httpresponse/success-response';
import type { ReplaceCommentUseCaseInterface } from '../../../application/usecase/comment.usecases';
import type { CommentMapper } from '../mapper/comment.mapper';

export class ReplaceCommentHandler {
  constructor(
    private readonly useCase: ReplaceCommentUseCaseInterface,
    private readonly mapper: CommentMapper
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
