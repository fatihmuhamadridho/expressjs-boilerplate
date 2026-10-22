import type { RequestHandler } from 'express';
import { GetUserListHandler } from './get-user-list.handler';
import { SearchUserHandler } from './search-user.handler';
import { FilterUserHandler } from './filter-user.handler';
import { GetUserProfileHandler } from './get-user-profile.handler';
import { GetUserDetailHandler } from './get-user-detail.handler';
import { GetUserCartsHandler } from './get-user-carts.handler';
import { GetUserPostsHandler } from './get-user-posts.handler';
import { GetUserTodosHandler } from './get-user-todos.handler';
import { CreateUserHandler } from './create-user.handler';
import { LoginUserHandler } from './login-user.handler';
import { ReplaceUserHandler } from './replace-user.handler';
import { UpdateUserHandler } from './update-user.handler';
import { DeleteUserHandler } from './delete-user.handler';
import type {
  GetUserListUseCaseInterface,
  SearchUserUseCaseInterface,
  FilterUserUseCaseInterface,
  GetUserProfileUseCaseInterface,
  GetUserDetailUseCaseInterface,
  GetUserCartsUseCaseInterface,
  GetUserPostsUseCaseInterface,
  GetUserTodosUseCaseInterface,
  CreateUserUseCaseInterface,
  LoginUserUseCaseInterface,
  ReplaceUserUseCaseInterface,
  UpdateUserUseCaseInterface,
  DeleteUserUseCaseInterface,
} from '../../../application/usecase/user.usecases';
import type { UserMapper } from '../mapper/user.mapper';

export interface UserUseCases {
  getAll: GetUserListUseCaseInterface;
  search: SearchUserUseCaseInterface;
  filter: FilterUserUseCaseInterface;
  getCurrentUser: GetUserProfileUseCaseInterface;
  getById: GetUserDetailUseCaseInterface;
  getCarts: GetUserCartsUseCaseInterface;
  getPosts: GetUserPostsUseCaseInterface;
  getTodos: GetUserTodosUseCaseInterface;
  add: CreateUserUseCaseInterface;
  login: LoginUserUseCaseInterface;
  replace: ReplaceUserUseCaseInterface;
  update: UpdateUserUseCaseInterface;
  delete: DeleteUserUseCaseInterface;
}

export class UserHandler {
  readonly getAll: RequestHandler;
  readonly search: RequestHandler;
  readonly filter: RequestHandler;
  readonly getCurrentUser: RequestHandler;
  readonly getById: RequestHandler;
  readonly getCarts: RequestHandler;
  readonly getPosts: RequestHandler;
  readonly getTodos: RequestHandler;
  readonly add: RequestHandler;
  readonly login: RequestHandler;
  readonly replace: RequestHandler;
  readonly update: RequestHandler;
  readonly delete: RequestHandler;

  constructor(useCases: UserUseCases, mapper: UserMapper) {
    this.getAll = new GetUserListHandler(useCases.getAll, mapper).Handle;
    this.search = new SearchUserHandler(useCases.search, mapper).Handle;
    this.filter = new FilterUserHandler(useCases.filter, mapper).Handle;
    this.getCurrentUser = new GetUserProfileHandler(useCases.getCurrentUser, mapper).Handle;
    this.getById = new GetUserDetailHandler(useCases.getById, mapper).Handle;
    this.getCarts = new GetUserCartsHandler(useCases.getCarts, mapper).Handle;
    this.getPosts = new GetUserPostsHandler(useCases.getPosts, mapper).Handle;
    this.getTodos = new GetUserTodosHandler(useCases.getTodos, mapper).Handle;
    this.add = new CreateUserHandler(useCases.add, mapper).Handle;
    this.login = new LoginUserHandler(useCases.login, mapper).Handle;
    this.replace = new ReplaceUserHandler(useCases.replace, mapper).Handle;
    this.update = new UpdateUserHandler(useCases.update, mapper).Handle;
    this.delete = new DeleteUserHandler(useCases.delete, mapper).Handle;
  }
}
