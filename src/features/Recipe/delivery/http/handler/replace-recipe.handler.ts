import type { NextFunction, Request, Response } from 'express';
import { writeResponse } from '../../../../../pkg/httpresponse/success-response';
import type { ReplaceRecipeUseCaseInterface } from '../../../application/usecase/recipe.usecases';
import type { RecipeMapper } from '../mapper/recipe.mapper';

export class ReplaceRecipeHandler {
  constructor(
    private readonly useCase: ReplaceRecipeUseCaseInterface,
    private readonly mapper: RecipeMapper
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
