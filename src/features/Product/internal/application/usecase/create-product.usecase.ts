import type { ProductCommandDTO, ProductResultDTO } from '../dto/product.dto';
import type { ProductRepository } from '../../../domain/repository/product.repository';

export interface CreateProductUseCaseInterface {
  Execute(command: ProductCommandDTO): Promise<ProductResultDTO>;
}
export class CreateProductUseCase implements CreateProductUseCaseInterface {
  constructor(private readonly repository: ProductRepository) {}
  Execute(command: ProductCommandDTO): Promise<ProductResultDTO> {
    return this.repository.add(command);
  }
}
