import type { CartCommandDTO, CartResultDTO } from '../dto/cart.dto';
import type { CartRepository } from '../../domain/repository/cart.repository';
import { CartId } from '../../domain/valueobject/cart-id';

export interface ReplaceCartUseCaseInterface {
  Execute(id: string, command: CartCommandDTO): Promise<CartResultDTO>;
}

export class ReplaceCartUseCase implements ReplaceCartUseCaseInterface {
  constructor(private readonly repository: CartRepository) {}

  Execute(id: string, command: CartCommandDTO): Promise<CartResultDTO> {
    return this.repository.replace(CartId.create(id), command);
  }
}
