import type { RecipeCommandDTO, RecipeQueryDTO, RecipeResultDTO } from '../dto/recipe.dto';
import type { RecipeRepository } from '../recipe.interface';

export class RecipeUseCases {
  constructor(private readonly repository: RecipeRepository) {}
  getAll(query: RecipeQueryDTO): Promise<RecipeResultDTO> {
    return this.repository.getAll(query);
  }
  search(query: RecipeQueryDTO): Promise<RecipeResultDTO> {
    return this.repository.search(query);
  }
  getTags(query: RecipeQueryDTO): Promise<RecipeResultDTO> {
    return this.repository.getTags(query);
  }
  getByTag(tag: string, query: RecipeQueryDTO): Promise<RecipeResultDTO> {
    return this.repository.getByTag(tag, query);
  }
  getByMealType(mealType: string, query: RecipeQueryDTO): Promise<RecipeResultDTO> {
    return this.repository.getByMealType(mealType, query);
  }
  getById(id: string, query: RecipeQueryDTO): Promise<RecipeResultDTO> {
    return this.repository.getById(id, query);
  }
  add(command: RecipeCommandDTO): Promise<RecipeResultDTO> {
    return this.repository.add(command);
  }
  replace(id: string, command: RecipeCommandDTO): Promise<RecipeResultDTO> {
    return this.repository.replace(id, command);
  }
  update(id: string, command: RecipeCommandDTO): Promise<RecipeResultDTO> {
    return this.repository.update(id, command);
  }
  delete(id: string, command: RecipeCommandDTO): Promise<RecipeResultDTO> {
    return this.repository.delete(id, command);
  }
}
