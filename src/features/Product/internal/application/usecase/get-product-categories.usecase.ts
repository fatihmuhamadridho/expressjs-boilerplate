import type { ProductQueryDTO, ProductResultDTO } from '../dto/product.dto';
import type { ProductRepository } from '../../../domain/repository/product.repository';

export interface GetProductCategoryListUseCaseInterface {
  Execute(query: ProductQueryDTO): Promise<ProductResultDTO>;
}
export class GetProductCategoryListUseCase implements GetProductCategoryListUseCaseInterface {
  constructor(private readonly repository: ProductRepository) {}
  Execute(query: ProductQueryDTO): Promise<ProductResultDTO> {
    return this.repository.getCategoryList(query);
  }
}

export interface GetProductCategoriesUseCaseInterface {
  Execute(query: ProductQueryDTO): Promise<ProductResultDTO>;
}
export class GetProductCategoriesUseCase implements GetProductCategoriesUseCaseInterface {
  constructor(private readonly repository: ProductRepository) {}
  Execute(query: ProductQueryDTO): Promise<ProductResultDTO> {
    return this.repository.getCategories(query);
  }
}

export interface GetProductsByCategoryUseCaseInterface {
  Execute(category: string, query: ProductQueryDTO): Promise<ProductResultDTO>;
}
export class GetProductsByCategoryUseCase implements GetProductsByCategoryUseCaseInterface {
  constructor(private readonly repository: ProductRepository) {}
  Execute(category: string, query: ProductQueryDTO): Promise<ProductResultDTO> {
    return this.repository.getByCategory(category, query);
  }
}
