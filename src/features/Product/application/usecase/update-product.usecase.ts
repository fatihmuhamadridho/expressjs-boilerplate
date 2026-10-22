import type { ProductCommandDTO, ProductResultDTO } from '../dto/product.dto';
import type { ProductRepository } from '../../domain/repository/product.repository';
import { ProductId } from '../../domain/valueobject/product-id';

export interface UpdateProductUseCaseInterface {
  Execute(id: string, command: ProductCommandDTO): Promise<ProductResultDTO>;
}

export class UpdateProductUseCase implements UpdateProductUseCaseInterface {
  constructor(private readonly repository: ProductRepository) {}

  Execute(id: string, command: ProductCommandDTO): Promise<ProductResultDTO> {
    return this.repository.update(ProductId.create(id), command);
  }
}
