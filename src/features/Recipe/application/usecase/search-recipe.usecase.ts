import type { RecipeQueryDTO, RecipeResultDTO } from '../dto/recipe.dto';
import type { RecipeRepository } from '../../domain/repository/recipe.repository';

export interface SearchRecipeUseCaseInterface {
  Execute(query: RecipeQueryDTO): Promise<RecipeResultDTO>;
}

export class SearchRecipeUseCase implements SearchRecipeUseCaseInterface {
  constructor(private readonly repository: RecipeRepository) {}

  Execute(query: RecipeQueryDTO): Promise<RecipeResultDTO> {
    return this.repository.search(query);
  }
}
