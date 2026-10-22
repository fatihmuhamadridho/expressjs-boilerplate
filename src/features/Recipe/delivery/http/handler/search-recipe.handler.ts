import type { NextFunction, Request, Response } from 'express';
import { writeResponse } from '../../../../../pkg/httpresponse/success-response';
import type { SearchRecipeUseCaseInterface } from '../../../application/usecase/recipe.usecases';
import type { RecipeMapper } from '../mapper/recipe.mapper';

export class SearchRecipeHandler {
  constructor(
    private readonly useCase: SearchRecipeUseCaseInterface,
    private readonly mapper: RecipeMapper
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
