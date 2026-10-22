import type { RecipeQueryDTO, RecipeResultDTO } from '../dto/recipe.dto';
import type { RecipeRepository } from '../../domain/repository/recipe.repository';

export interface GetRecipeDetailUseCaseInterface {
  Execute(id: string, query: RecipeQueryDTO): Promise<RecipeResultDTO>;
}

export class GetRecipeDetailUseCase implements GetRecipeDetailUseCaseInterface {
  constructor(private readonly repository: RecipeRepository) {}

  Execute(id: string, query: RecipeQueryDTO): Promise<RecipeResultDTO> {
    return this.repository.getById(id, query);
  }
}
