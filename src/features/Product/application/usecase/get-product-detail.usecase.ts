import type { ProductQueryDTO, ProductResultDTO } from '../dto/product.dto';
import type { ProductRepository } from '../../domain/repository/product.repository';
import { ProductId } from '../../domain/valueobject/product-id';

export interface GetProductDetailUseCaseInterface {
  Execute(id: string, query: ProductQueryDTO): Promise<ProductResultDTO>;
}

export class GetProductDetailUseCase implements GetProductDetailUseCaseInterface {
  constructor(private readonly repository: ProductRepository) {}
  Execute(id: string, query: ProductQueryDTO): Promise<ProductResultDTO> {
    return this.repository.getById(ProductId.create(id), query);
  }
}
