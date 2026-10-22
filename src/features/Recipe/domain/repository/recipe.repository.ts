import type { ResourceResult } from '../../../../pkg/httpclient/http-client';

export interface RecipeQuery {
  queryString: string;
  headers: Readonly<Record<string, string>>;
}

export interface RecipeCommand {
  queryString?: string;
  headers: Readonly<Record<string, string>>;
  body?: Uint8Array;
}

export interface RecipeRepository {
  getAll(query: RecipeQuery): Promise<ResourceResult>;
  search(query: RecipeQuery): Promise<ResourceResult>;
  getTags(query: RecipeQuery): Promise<ResourceResult>;
  getByTag(tag: string, query: RecipeQuery): Promise<ResourceResult>;
  getByMealType(mealType: string, query: RecipeQuery): Promise<ResourceResult>;
  getById(id: string, query: RecipeQuery): Promise<ResourceResult>;
  add(command: RecipeCommand): Promise<ResourceResult>;
  replace(id: string, command: RecipeCommand): Promise<ResourceResult>;
  update(id: string, command: RecipeCommand): Promise<ResourceResult>;
  delete(id: string, command: RecipeCommand): Promise<ResourceResult>;
}
