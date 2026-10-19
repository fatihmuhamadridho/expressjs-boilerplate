import type { ProductCommandDTO, ProductResultDTO } from '../dto/product.dto';
import type { ProductRepository } from '../../../domain/repository/product.repository';
import { ProductId } from '../../../domain/valueobject/product-id';

export interface ReplaceProductUseCaseInterface {
  Execute(id: string, command: ProductCommandDTO): Promise<ProductResultDTO>;
}
export class ReplaceProductUseCase implements ReplaceProductUseCaseInterface {
  constructor(private readonly repository: ProductRepository) {}
  Execute(id: string, command: ProductCommandDTO): Promise<ProductResultDTO> {
    return this.repository.replace(ProductId.create(id), command);
  }
}

export interface UpdateProductUseCaseInterface {
  Execute(id: string, command: ProductCommandDTO): Promise<ProductResultDTO>;
}
export class UpdateProductUseCase implements UpdateProductUseCaseInterface {
  constructor(private readonly repository: ProductRepository) {}
  Execute(id: string, command: ProductCommandDTO): Promise<ProductResultDTO> {
    return this.repository.update(ProductId.create(id), command);
  }
}

export interface DeleteProductUseCaseInterface {
  Execute(id: string, command: ProductCommandDTO): Promise<ProductResultDTO>;
}
export class DeleteProductUseCase implements DeleteProductUseCaseInterface {
  constructor(private readonly repository: ProductRepository) {}
  Execute(id: string, command: ProductCommandDTO): Promise<ProductResultDTO> {
    return this.repository.delete(ProductId.create(id), command);
  }
}
