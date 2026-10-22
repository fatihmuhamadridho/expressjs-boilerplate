import type { ProductQueryDTO, ProductResultDTO } from '../dto/product.dto';
import type { ProductRepository } from '../../domain/repository/product.repository';

export interface GetProductListUseCaseInterface {
  Execute(query: ProductQueryDTO): Promise<ProductResultDTO>;
}

export class GetProductListUseCase implements GetProductListUseCaseInterface {
  constructor(private readonly repository: ProductRepository) {}
  async Execute(query: ProductQueryDTO): Promise<ProductResultDTO> {
    return this.repository.getAll(query);
  }
}
