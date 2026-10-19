import type { ProductQueryDTO, ProductResultDTO } from '../dto/product.dto';
import type { ProductRepository } from '../../../domain/repository/product.repository';

export interface GetProductsUseCaseInterface {
  Execute(query: ProductQueryDTO): Promise<ProductResultDTO>;
}

export class GetProductsUseCase implements GetProductsUseCaseInterface {
  constructor(private readonly repository: ProductRepository) {}
  async Execute(query: ProductQueryDTO): Promise<ProductResultDTO> {
    return this.repository.getAll(query);
  }
}
