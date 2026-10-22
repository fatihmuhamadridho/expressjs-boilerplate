import type { CartQueryDTO, CartResultDTO } from '../dto/cart.dto';
import type { CartRepository } from '../../domain/repository/cart.repository';

export interface GetCartByUserIdUseCaseInterface {
  Execute(userId: string, query: CartQueryDTO): Promise<CartResultDTO>;
}

export class GetCartByUserIdUseCase implements GetCartByUserIdUseCaseInterface {
  constructor(private readonly repository: CartRepository) {}

  Execute(userId: string, query: CartQueryDTO): Promise<CartResultDTO> {
    return this.repository.getByUserId(userId, query);
  }
}
