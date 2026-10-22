import type { RecipeCommandDTO, RecipeResultDTO } from '../dto/recipe.dto';
import type { RecipeRepository } from '../../domain/repository/recipe.repository';

export interface CreateRecipeUseCaseInterface {
  Execute(command: RecipeCommandDTO): Promise<RecipeResultDTO>;
}

export class CreateRecipeUseCase implements CreateRecipeUseCaseInterface {
  constructor(private readonly repository: RecipeRepository) {}

  Execute(command: RecipeCommandDTO): Promise<RecipeResultDTO> {
    return this.repository.add(command);
  }
}
