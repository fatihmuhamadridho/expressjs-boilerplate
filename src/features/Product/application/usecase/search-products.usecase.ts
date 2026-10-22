import type { ProductQueryDTO, ProductResultDTO } from '../dto/product.dto';
import type { ProductRepository } from '../../domain/repository/product.repository';

export interface SearchProductsUseCaseInterface {
  Execute(query: ProductQueryDTO): Promise<ProductResultDTO>;
}

export class SearchProductsUseCase implements SearchProductsUseCaseInterface {
  constructor(private readonly repository: ProductRepository) {}
  Execute(query: ProductQueryDTO): Promise<ProductResultDTO> {
    return this.repository.search(query);
  }
}
