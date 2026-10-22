import type { CartCommandDTO, CartResultDTO } from '../dto/cart.dto';
import type { CartRepository } from '../../domain/repository/cart.repository';
import { CartId } from '../../domain/valueobject/cart-id';

export interface DeleteCartUseCaseInterface {
  Execute(id: string, command: CartCommandDTO): Promise<CartResultDTO>;
}

export class DeleteCartUseCase implements DeleteCartUseCaseInterface {
  constructor(private readonly repository: CartRepository) {}

  Execute(id: string, command: CartCommandDTO): Promise<CartResultDTO> {
    return this.repository.delete(CartId.create(id), command);
  }
}
