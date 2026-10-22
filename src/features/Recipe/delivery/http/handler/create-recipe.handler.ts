import type { NextFunction, Request, Response } from 'express';
import { writeResponse } from '../../../../../pkg/httpresponse/success-response';
import type { CreateRecipeUseCaseInterface } from '../../../application/usecase/recipe.usecases';
import type { RecipeMapper } from '../mapper/recipe.mapper';

export class CreateRecipeHandler {
  constructor(
    private readonly useCase: CreateRecipeUseCaseInterface,
    private readonly mapper: RecipeMapper
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
