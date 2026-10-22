import type { RequestHandler } from 'express';
import { GetProductListHandler } from './get-product-list.handler';
import { SearchProductsHandler } from './search-products.handler';
import { GetProductDetailHandler } from './get-product-detail.handler';
import { GetProductCategoryListHandler } from './get-product-category-list.handler';
import { GetProductCategoriesHandler } from './get-product-categories.handler';
import { GetProductsByCategoryHandler } from './get-products-by-category.handler';
import { CreateProductHandler } from './create-product.handler';
import { ReplaceProductHandler } from './replace-product.handler';
import { UpdateProductHandler } from './update-product.handler';
import { DeleteProductHandler } from './delete-product.handler';
import type {
  CreateProductUseCaseInterface,
  DeleteProductUseCaseInterface,
  GetProductDetailUseCaseInterface,
  GetProductListUseCaseInterface,
  ReplaceProductUseCaseInterface,
  SearchProductsUseCaseInterface,
  UpdateProductUseCaseInterface,
} from '../../../application/usecase/product.usecases';
import type {
  GetProductCategoriesUseCaseInterface,
  GetProductCategoryListUseCaseInterface,
  GetProductsByCategoryUseCaseInterface,
} from '../../../application/usecase/product.usecases';
import type { ProductMapper } from '../mapper/product.mapper';

export interface ProductUseCases {
  getAll: GetProductListUseCaseInterface;
  search: SearchProductsUseCaseInterface;
  getById: GetProductDetailUseCaseInterface;
  getCategoryList: GetProductCategoryListUseCaseInterface;
  getCategories: GetProductCategoriesUseCaseInterface;
  getByCategory: GetProductsByCategoryUseCaseInterface;
  add: CreateProductUseCaseInterface;
  replace: ReplaceProductUseCaseInterface;
  update: UpdateProductUseCaseInterface;
  delete: DeleteProductUseCaseInterface;
}

export class ProductHandler {
  readonly getAll: RequestHandler;
  readonly search: RequestHandler;
  readonly getById: RequestHandler;
  readonly getCategoryList: RequestHandler;
  readonly getCategories: RequestHandler;
  readonly getByCategory: RequestHandler;
  readonly add: RequestHandler;
  readonly replace: RequestHandler;
  readonly update: RequestHandler;
  readonly delete: RequestHandler;

  constructor(useCases: ProductUseCases, mapper: ProductMapper) {
    this.getAll = new GetProductListHandler(useCases.getAll, mapper).Handle;
    this.search = new SearchProductsHandler(useCases.search, mapper).Handle;
    this.getById = new GetProductDetailHandler(useCases.getById, mapper).Handle;
    this.getCategoryList = new GetProductCategoryListHandler(useCases.getCategoryList, mapper).Handle;
    this.getCategories = new GetProductCategoriesHandler(useCases.getCategories, mapper).Handle;
    this.getByCategory = new GetProductsByCategoryHandler(useCases.getByCategory, mapper).Handle;
    this.add = new CreateProductHandler(useCases.add, mapper).Handle;
    this.replace = new ReplaceProductHandler(useCases.replace, mapper).Handle;
    this.update = new UpdateProductHandler(useCases.update, mapper).Handle;
    this.delete = new DeleteProductHandler(useCases.delete, mapper).Handle;
  }
}
