import type { CartQueryDTO, CartResultDTO } from '../dto/cart.dto';
import type { CartRepository } from '../../domain/repository/cart.repository';
import { CartId } from '../../domain/valueobject/cart-id';

export interface GetCartDetailUseCaseInterface {
  Execute(id: string, query: CartQueryDTO): Promise<CartResultDTO>;
}

export class GetCartDetailUseCase implements GetCartDetailUseCaseInterface {
  constructor(private readonly repository: CartRepository) {}

  Execute(id: string, query: CartQueryDTO): Promise<CartResultDTO> {
    return this.repository.getById(CartId.create(id), query);
  }
}
