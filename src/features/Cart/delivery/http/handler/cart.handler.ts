import type { RequestHandler } from 'express';
import { GetCartListHandler } from './get-cart-list.handler';
import { GetCartDetailHandler } from './get-cart-detail.handler';
import { GetCartByUserIdHandler } from './get-cart-by-user-id.handler';
import { CreateCartHandler } from './create-cart.handler';
import { ReplaceCartHandler } from './replace-cart.handler';
import { UpdateCartHandler } from './update-cart.handler';
import { DeleteCartHandler } from './delete-cart.handler';
import type {
  GetCartListUseCaseInterface,
  GetCartDetailUseCaseInterface,
  GetCartByUserIdUseCaseInterface,
  CreateCartUseCaseInterface,
  ReplaceCartUseCaseInterface,
  UpdateCartUseCaseInterface,
  DeleteCartUseCaseInterface,
} from '../../../application/usecase/cart.usecases';
import type { CartMapper } from '../mapper/cart.mapper';

export interface CartUseCases {
  getAll: GetCartListUseCaseInterface;
  getById: GetCartDetailUseCaseInterface;
  getByUserId: GetCartByUserIdUseCaseInterface;
  add: CreateCartUseCaseInterface;
  replace: ReplaceCartUseCaseInterface;
  update: UpdateCartUseCaseInterface;
  delete: DeleteCartUseCaseInterface;
}

export class CartHandler {
  readonly getAll: RequestHandler;
  readonly getById: RequestHandler;
  readonly getByUserId: RequestHandler;
  readonly add: RequestHandler;
  readonly replace: RequestHandler;
  readonly update: RequestHandler;
  readonly delete: RequestHandler;

  constructor(useCases: CartUseCases, mapper: CartMapper) {
    this.getAll = new GetCartListHandler(useCases.getAll, mapper).Handle;
    this.getById = new GetCartDetailHandler(useCases.getById, mapper).Handle;
    this.getByUserId = new GetCartByUserIdHandler(useCases.getByUserId, mapper).Handle;
    this.add = new CreateCartHandler(useCases.add, mapper).Handle;
    this.replace = new ReplaceCartHandler(useCases.replace, mapper).Handle;
    this.update = new UpdateCartHandler(useCases.update, mapper).Handle;
    this.delete = new DeleteCartHandler(useCases.delete, mapper).Handle;
  }
}
