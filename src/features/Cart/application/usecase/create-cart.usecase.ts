import type { CartCommandDTO, CartResultDTO } from '../dto/cart.dto';
import type { CartRepository } from '../../domain/repository/cart.repository';

export interface CreateCartUseCaseInterface {
  Execute(command: CartCommandDTO): Promise<CartResultDTO>;
}

export class CreateCartUseCase implements CreateCartUseCaseInterface {
  constructor(private readonly repository: CartRepository) {}

  Execute(command: CartCommandDTO): Promise<CartResultDTO> {
    return this.repository.add(command);
  }
}
