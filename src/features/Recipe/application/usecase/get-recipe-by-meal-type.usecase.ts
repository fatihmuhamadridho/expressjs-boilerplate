import type { RecipeQueryDTO, RecipeResultDTO } from '../dto/recipe.dto';
import type { RecipeRepository } from '../../domain/repository/recipe.repository';

export interface GetRecipeByMealTypeUseCaseInterface {
  Execute(mealType: string, query: RecipeQueryDTO): Promise<RecipeResultDTO>;
}

export class GetRecipeByMealTypeUseCase implements GetRecipeByMealTypeUseCaseInterface {
  constructor(private readonly repository: RecipeRepository) {}

  Execute(mealType: string, query: RecipeQueryDTO): Promise<RecipeResultDTO> {
    return this.repository.getByMealType(mealType, query);
  }
}
