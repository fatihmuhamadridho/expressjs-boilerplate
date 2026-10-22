import type { ProductQueryDTO, ProductResultDTO } from '../dto/product.dto';
import type { ProductRepository } from '../../domain/repository/product.repository';

export interface GetProductsByCategoryUseCaseInterface {
  Execute(category: string, query: ProductQueryDTO): Promise<ProductResultDTO>;
}
export class GetProductsByCategoryUseCase implements GetProductsByCategoryUseCaseInterface {
  constructor(private readonly repository: ProductRepository) {}
  Execute(category: string, query: ProductQueryDTO): Promise<ProductResultDTO> {
    return this.repository.getByCategory(category, query);
  }
}
