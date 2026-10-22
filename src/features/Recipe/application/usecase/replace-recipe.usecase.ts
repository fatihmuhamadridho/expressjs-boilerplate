import type { RecipeCommandDTO, RecipeResultDTO } from '../dto/recipe.dto';
import type { RecipeRepository } from '../../domain/repository/recipe.repository';

export interface ReplaceRecipeUseCaseInterface {
  Execute(id: string, command: RecipeCommandDTO): Promise<RecipeResultDTO>;
}

export class ReplaceRecipeUseCase implements ReplaceRecipeUseCaseInterface {
  constructor(private readonly repository: RecipeRepository) {}

  Execute(id: string, command: RecipeCommandDTO): Promise<RecipeResultDTO> {
    return this.repository.replace(id, command);
  }
}
