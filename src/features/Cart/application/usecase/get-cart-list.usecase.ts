import type { CartQueryDTO, CartResultDTO } from '../dto/cart.dto';
import type { CartRepository } from '../../domain/repository/cart.repository';

export interface GetCartListUseCaseInterface {
  Execute(query: CartQueryDTO): Promise<CartResultDTO>;
}

export class GetCartListUseCase implements GetCartListUseCaseInterface {
  constructor(private readonly repository: CartRepository) {}

  Execute(query: CartQueryDTO): Promise<CartResultDTO> {
    return this.repository.getAll(query);
  }
}
