import type { NextFunction, Request, Response } from 'express';
import { writeResponse } from '../../../../../pkg/httpresponse/success-response';
import type { CreatePostUseCaseInterface } from '../../../application/usecase/post.usecases';
import type { PostMapper } from '../mapper/post.mapper';

export class CreatePostHandler {
  constructor(
    private readonly useCase: CreatePostUseCaseInterface,
    private readonly mapper: PostMapper
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
