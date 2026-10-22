import type { RecipeQueryDTO, RecipeResultDTO } from '../dto/recipe.dto';
import type { RecipeRepository } from '../../domain/repository/recipe.repository';

export interface GetRecipeListUseCaseInterface {
  Execute(query: RecipeQueryDTO): Promise<RecipeResultDTO>;
}

export class GetRecipeListUseCase implements GetRecipeListUseCaseInterface {
  constructor(private readonly repository: RecipeRepository) {}

  Execute(query: RecipeQueryDTO): Promise<RecipeResultDTO> {
    return this.repository.getAll(query);
  }
}
