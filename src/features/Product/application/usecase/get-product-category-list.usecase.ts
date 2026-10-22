import type { ProductQueryDTO, ProductResultDTO } from '../dto/product.dto';
import type { ProductRepository } from '../../domain/repository/product.repository';

export interface GetProductCategoryListUseCaseInterface {
  Execute(query: ProductQueryDTO): Promise<ProductResultDTO>;
}
export class GetProductCategoryListUseCase implements GetProductCategoryListUseCaseInterface {
  constructor(private readonly repository: ProductRepository) {}
  Execute(query: ProductQueryDTO): Promise<ProductResultDTO> {
    return this.repository.getCategoryList(query);
  }
}
