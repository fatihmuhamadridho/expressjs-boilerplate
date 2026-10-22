import type { ResourceResult } from '../../../../pkg/httpclient/http-client';
import type { RecipeCommand, RecipeQuery } from '../../domain/repository/recipe.repository';

export type RecipeQueryDTO = RecipeQuery;
export type RecipeCommandDTO = RecipeCommand;
export type RecipeResultDTO = ResourceResult;
