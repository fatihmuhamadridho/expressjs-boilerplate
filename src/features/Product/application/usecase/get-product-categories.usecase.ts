import type { ProductQueryDTO, ProductResultDTO } from '../dto/product.dto';
import type { ProductRepository } from '../../domain/repository/product.repository';

export interface GetProductCategoriesUseCaseInterface {
  Execute(query: ProductQueryDTO): Promise<ProductResultDTO>;
}

export class GetProductCategoriesUseCase implements GetProductCategoriesUseCaseInterface {
  constructor(private readonly repository: ProductRepository) {}

  Execute(query: ProductQueryDTO): Promise<ProductResultDTO> {
    return this.repository.getCategories(query);
  }
}
