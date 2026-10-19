import type { CartCommandDTO, CartQueryDTO, CartResultDTO } from '../dto/cart.dto';
import type { CartRepository } from '../../../domain/repository/cart.repository';
import { CartId } from '../../../domain/valueobject/cart-id';

export interface CartUseCaseInterface {
  getAll(query: CartQueryDTO): Promise<CartResultDTO>;
  getById(id: string, query: CartQueryDTO): Promise<CartResultDTO>;
  getByUserId(userId: string, query: CartQueryDTO): Promise<CartResultDTO>;
  add(command: CartCommandDTO): Promise<CartResultDTO>;
  replace(id: string, command: CartCommandDTO): Promise<CartResultDTO>;
  update(id: string, command: CartCommandDTO): Promise<CartResultDTO>;
  delete(id: string, command: CartCommandDTO): Promise<CartResultDTO>;
}

export class CartUseCase implements CartUseCaseInterface {
  constructor(private readonly repository: CartRepository) {}
  getAll(query: CartQueryDTO): Promise<CartResultDTO> {
    return this.repository.getAll(query);
  }
  getById(id: string, query: CartQueryDTO): Promise<CartResultDTO> {
    return this.repository.getById(CartId.create(id), query);
  }
  getByUserId(userId: string, query: CartQueryDTO): Promise<CartResultDTO> {
    return this.repository.getByUserId(userId, query);
  }
  add(command: CartCommandDTO): Promise<CartResultDTO> {
    return this.repository.add(command);
  }
  replace(id: string, command: CartCommandDTO): Promise<CartResultDTO> {
    return this.repository.replace(CartId.create(id), command);
  }
  update(id: string, command: CartCommandDTO): Promise<CartResultDTO> {
    return this.repository.update(CartId.create(id), command);
  }
  delete(id: string, command: CartCommandDTO): Promise<CartResultDTO> {
    return this.repository.delete(CartId.create(id), command);
  }
}
