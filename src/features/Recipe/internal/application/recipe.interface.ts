import type { DummyJsonResponse } from '../../../../common/dummyjson/application/dummyjson.interface';

export interface RecipeQuery {
  queryString: string;
  headers: Readonly<Record<string, string>>;
}

export interface RecipeCommand {
  headers: Readonly<Record<string, string>>;
  body?: Uint8Array;
}

export interface RecipeRepository {
  getAll(query: RecipeQuery): Promise<DummyJsonResponse>;
  search(query: RecipeQuery): Promise<DummyJsonResponse>;
  getTags(query: RecipeQuery): Promise<DummyJsonResponse>;
  getByTag(tag: string, query: RecipeQuery): Promise<DummyJsonResponse>;
  getByMealType(mealType: string, query: RecipeQuery): Promise<DummyJsonResponse>;
  getById(id: string, query: RecipeQuery): Promise<DummyJsonResponse>;
  add(command: RecipeCommand): Promise<DummyJsonResponse>;
  replace(id: string, command: RecipeCommand): Promise<DummyJsonResponse>;
  update(id: string, command: RecipeCommand): Promise<DummyJsonResponse>;
  delete(id: string, command: RecipeCommand): Promise<DummyJsonResponse>;
}
