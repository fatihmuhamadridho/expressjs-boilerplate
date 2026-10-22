import type { RecipeQueryDTO, RecipeResultDTO } from '../dto/recipe.dto';
import type { RecipeRepository } from '../../domain/repository/recipe.repository';

export interface GetRecipeByTagUseCaseInterface {
  Execute(tag: string, query: RecipeQueryDTO): Promise<RecipeResultDTO>;
}

export class GetRecipeByTagUseCase implements GetRecipeByTagUseCaseInterface {
  constructor(private readonly repository: RecipeRepository) {}

  Execute(tag: string, query: RecipeQueryDTO): Promise<RecipeResultDTO> {
    return this.repository.getByTag(tag, query);
  }
}
