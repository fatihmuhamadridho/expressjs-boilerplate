import type { CartCommandDTO, CartResultDTO } from '../dto/cart.dto';
import type { CartRepository } from '../../domain/repository/cart.repository';
import { CartId } from '../../domain/valueobject/cart-id';

export interface UpdateCartUseCaseInterface {
  Execute(id: string, command: CartCommandDTO): Promise<CartResultDTO>;
}

export class UpdateCartUseCase implements UpdateCartUseCaseInterface {
  constructor(private readonly repository: CartRepository) {}

  Execute(id: string, command: CartCommandDTO): Promise<CartResultDTO> {
    return this.repository.update(CartId.create(id), command);
  }
}
