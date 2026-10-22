import type { RecipeCommandDTO, RecipeResultDTO } from '../dto/recipe.dto';
import type { RecipeRepository } from '../../domain/repository/recipe.repository';

export interface UpdateRecipeUseCaseInterface {
  Execute(id: string, command: RecipeCommandDTO): Promise<RecipeResultDTO>;
}

export class UpdateRecipeUseCase implements UpdateRecipeUseCaseInterface {
  constructor(private readonly repository: RecipeRepository) {}

  Execute(id: string, command: RecipeCommandDTO): Promise<RecipeResultDTO> {
    return this.repository.update(id, command);
  }
}
