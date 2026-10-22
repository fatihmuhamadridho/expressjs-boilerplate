import type { NextFunction, Request, Response } from 'express';
import { writeResponse } from '../../../../../pkg/httpresponse/success-response';
import type { GetRecipeByTagUseCaseInterface } from '../../../application/usecase/recipe.usecases';
import type { RecipeMapper } from '../mapper/recipe.mapper';

export class GetRecipeByTagHandler {
  constructor(
    private readonly useCase: GetRecipeByTagUseCaseInterface,
    private readonly mapper: RecipeMapper
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
