import type { RequestHandler } from 'express';
import { GetRecipeListHandler } from './get-recipe-list.handler';
import { SearchRecipeHandler } from './search-recipe.handler';
import { GetRecipeTagsHandler } from './get-recipe-tags.handler';
import { GetRecipeByTagHandler } from './get-recipe-by-tag.handler';
import { GetRecipeByMealTypeHandler } from './get-recipe-by-meal-type.handler';
import { GetRecipeDetailHandler } from './get-recipe-detail.handler';
import { CreateRecipeHandler } from './create-recipe.handler';
import { ReplaceRecipeHandler } from './replace-recipe.handler';
import { UpdateRecipeHandler } from './update-recipe.handler';
import { DeleteRecipeHandler } from './delete-recipe.handler';
import type {
  GetRecipeListUseCaseInterface,
  SearchRecipeUseCaseInterface,
  GetRecipeTagsUseCaseInterface,
  GetRecipeByTagUseCaseInterface,
  GetRecipeByMealTypeUseCaseInterface,
  GetRecipeDetailUseCaseInterface,
  CreateRecipeUseCaseInterface,
  ReplaceRecipeUseCaseInterface,
  UpdateRecipeUseCaseInterface,
  DeleteRecipeUseCaseInterface,
} from '../../../application/usecase/recipe.usecases';
import type { RecipeMapper } from '../mapper/recipe.mapper';

export interface RecipeUseCases {
  getAll: GetRecipeListUseCaseInterface;
  search: SearchRecipeUseCaseInterface;
  getTags: GetRecipeTagsUseCaseInterface;
  getByTag: GetRecipeByTagUseCaseInterface;
  getByMealType: GetRecipeByMealTypeUseCaseInterface;
  getById: GetRecipeDetailUseCaseInterface;
  add: CreateRecipeUseCaseInterface;
  replace: ReplaceRecipeUseCaseInterface;
  update: UpdateRecipeUseCaseInterface;
  delete: DeleteRecipeUseCaseInterface;
}

export class RecipeHandler {
  readonly getAll: RequestHandler;
  readonly search: RequestHandler;
  readonly getTags: RequestHandler;
  readonly getByTag: RequestHandler;
  readonly getByMealType: RequestHandler;
  readonly getById: RequestHandler;
  readonly add: RequestHandler;
  readonly replace: RequestHandler;
  readonly update: RequestHandler;
  readonly delete: RequestHandler;

  constructor(useCases: RecipeUseCases, mapper: RecipeMapper) {
    this.getAll = new GetRecipeListHandler(useCases.getAll, mapper).Handle;
    this.search = new SearchRecipeHandler(useCases.search, mapper).Handle;
    this.getTags = new GetRecipeTagsHandler(useCases.getTags, mapper).Handle;
    this.getByTag = new GetRecipeByTagHandler(useCases.getByTag, mapper).Handle;
    this.getByMealType = new GetRecipeByMealTypeHandler(useCases.getByMealType, mapper).Handle;
    this.getById = new GetRecipeDetailHandler(useCases.getById, mapper).Handle;
    this.add = new CreateRecipeHandler(useCases.add, mapper).Handle;
    this.replace = new ReplaceRecipeHandler(useCases.replace, mapper).Handle;
    this.update = new UpdateRecipeHandler(useCases.update, mapper).Handle;
    this.delete = new DeleteRecipeHandler(useCases.delete, mapper).Handle;
  }
}
