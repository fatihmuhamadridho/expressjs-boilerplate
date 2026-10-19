import type { NextFunction, Request, Response } from 'express';
import {
  DummyJsonGatewayError,
  type DummyJsonResponse,
} from '../../../../../../common/dummyjson/application/dummyjson.interface';
import { InvalidProductIdError } from '../../../../domain/valueobject/product-id';
import type {
  CreateProductUseCaseInterface,
  DeleteProductUseCaseInterface,
  GetProductByIDUseCaseInterface,
  GetProductsUseCaseInterface,
  ReplaceProductUseCaseInterface,
  SearchProductsUseCaseInterface,
  UpdateProductUseCaseInterface,
} from '../../../application/usecase/product.usecases';
import type {
  GetProductCategoriesUseCaseInterface,
  GetProductCategoryListUseCaseInterface,
  GetProductsByCategoryUseCaseInterface,
} from '../../../application/usecase/get-product-categories.usecase';
import { writeDummyJsonResponse } from '../../../../../../common/dummyjson/delivery/write-response';
import { ProductMapper } from '../mapper/product.mapper';

export interface ProductUseCases {
  getAll: GetProductsUseCaseInterface;
  search: SearchProductsUseCaseInterface;
  getById: GetProductByIDUseCaseInterface;
  getCategoryList: GetProductCategoryListUseCaseInterface;
  getCategories: GetProductCategoriesUseCaseInterface;
  getByCategory: GetProductsByCategoryUseCaseInterface;
  add: CreateProductUseCaseInterface;
  replace: ReplaceProductUseCaseInterface;
  update: UpdateProductUseCaseInterface;
  delete: DeleteProductUseCaseInterface;
}

export class ProductHandler {
  constructor(
    private readonly useCases: ProductUseCases,
    private readonly mapper: ProductMapper
  ) {}

  private execute =
    (work: (request: Request) => Promise<DummyJsonResponse>) =>
    async (request: Request, response: Response, next: NextFunction): Promise<void> => {
      try {
        writeDummyJsonResponse(response, await work(request));
      } catch (error) {
        if (error instanceof InvalidProductIdError) {
          response.status(400).json({ message: error.message });
          return;
        }
        if (error instanceof DummyJsonGatewayError) {
          response.status(error.kind === 'timeout' ? 504 : 502).json({ message: error.message });
          return;
        }
        next(error);
      }
    };

  getAll = this.execute((request) =>
    this.useCases.getAll.Execute(this.mapper.ToQueryDTO(this.mapper.ToQueryRequest(request)))
  );
  search = this.execute((request) =>
    this.useCases.search.Execute(this.mapper.ToQueryDTO(this.mapper.ToQueryRequest(request)))
  );
  getById = this.execute((request) =>
    this.useCases.getById.Execute(
      String(request.params.id),
      this.mapper.ToQueryDTO(this.mapper.ToQueryRequest(request))
    )
  );
  getCategoryList = this.execute((request) =>
    this.useCases.getCategoryList.Execute(this.mapper.ToQueryDTO(this.mapper.ToQueryRequest(request)))
  );
  getCategories = this.execute((request) =>
    this.useCases.getCategories.Execute(this.mapper.ToQueryDTO(this.mapper.ToQueryRequest(request)))
  );
  getByCategory = this.execute((request) =>
    this.useCases.getByCategory.Execute(
      String(request.params.category),
      this.mapper.ToQueryDTO(this.mapper.ToQueryRequest(request))
    )
  );
  add = this.execute((request) =>
    this.useCases.add.Execute(this.mapper.ToCommandDTO(this.mapper.ToCommandRequest(request)))
  );
  replace = this.execute((request) =>
    this.useCases.replace.Execute(
      String(request.params.id),
      this.mapper.ToCommandDTO(this.mapper.ToCommandRequest(request))
    )
  );
  update = this.execute((request) =>
    this.useCases.update.Execute(
      String(request.params.id),
      this.mapper.ToCommandDTO(this.mapper.ToCommandRequest(request))
    )
  );
  delete = this.execute((request) =>
    this.useCases.delete.Execute(
      String(request.params.id),
      this.mapper.ToCommandDTO(this.mapper.ToCommandRequest(request))
    )
  );
}
