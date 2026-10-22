import type { RecipeCommandDTO, RecipeResultDTO } from '../dto/recipe.dto';
import type { RecipeRepository } from '../../domain/repository/recipe.repository';

export interface DeleteRecipeUseCaseInterface {
  Execute(id: string, command: RecipeCommandDTO): Promise<RecipeResultDTO>;
}

export class DeleteRecipeUseCase implements DeleteRecipeUseCaseInterface {
  constructor(private readonly repository: RecipeRepository) {}

  Execute(id: string, command: RecipeCommandDTO): Promise<RecipeResultDTO> {
    return this.repository.delete(id, command);
  }
}
