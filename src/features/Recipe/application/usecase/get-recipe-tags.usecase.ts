import type { RecipeQueryDTO, RecipeResultDTO } from '../dto/recipe.dto';
import type { RecipeRepository } from '../../domain/repository/recipe.repository';

export interface GetRecipeTagsUseCaseInterface {
  Execute(query: RecipeQueryDTO): Promise<RecipeResultDTO>;
}

export class GetRecipeTagsUseCase implements GetRecipeTagsUseCaseInterface {
  constructor(private readonly repository: RecipeRepository) {}

  Execute(query: RecipeQueryDTO): Promise<RecipeResultDTO> {
    return this.repository.getTags(query);
  }
}
