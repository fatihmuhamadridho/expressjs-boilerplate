import type { RequestHandler } from 'express';
import { GetTodoListHandler } from './get-todo-list.handler';
import { GetTodoDetailHandler } from './get-todo-detail.handler';
import { GetRandomTodoHandler } from './get-random-todo.handler';
import { GetRandomBatchTodoHandler } from './get-random-batch-todo.handler';
import { GetTodoByUserIdHandler } from './get-todo-by-user-id.handler';
import { CreateTodoHandler } from './create-todo.handler';
import { ReplaceTodoHandler } from './replace-todo.handler';
import { UpdateTodoHandler } from './update-todo.handler';
import { DeleteTodoHandler } from './delete-todo.handler';
import type {
  GetTodoListUseCaseInterface,
  GetTodoDetailUseCaseInterface,
  GetRandomTodoUseCaseInterface,
  GetRandomBatchTodoUseCaseInterface,
  GetTodoByUserIdUseCaseInterface,
  CreateTodoUseCaseInterface,
  ReplaceTodoUseCaseInterface,
  UpdateTodoUseCaseInterface,
  DeleteTodoUseCaseInterface,
} from '../../../application/usecase/todo.usecases';
import type { TodoMapper } from '../mapper/todo.mapper';

export interface TodoUseCases {
  getAll: GetTodoListUseCaseInterface;
  getById: GetTodoDetailUseCaseInterface;
  getRandom: GetRandomTodoUseCaseInterface;
  getRandomBatch: GetRandomBatchTodoUseCaseInterface;
  getByUserId: GetTodoByUserIdUseCaseInterface;
  add: CreateTodoUseCaseInterface;
  replace: ReplaceTodoUseCaseInterface;
  update: UpdateTodoUseCaseInterface;
  delete: DeleteTodoUseCaseInterface;
}

export class TodoHandler {
  readonly getAll: RequestHandler;
  readonly getById: RequestHandler;
  readonly getRandom: RequestHandler;
  readonly getRandomBatch: RequestHandler;
  readonly getByUserId: RequestHandler;
  readonly add: RequestHandler;
  readonly replace: RequestHandler;
  readonly update: RequestHandler;
  readonly delete: RequestHandler;

  constructor(useCases: TodoUseCases, mapper: TodoMapper) {
    this.getAll = new GetTodoListHandler(useCases.getAll, mapper).Handle;
    this.getById = new GetTodoDetailHandler(useCases.getById, mapper).Handle;
    this.getRandom = new GetRandomTodoHandler(useCases.getRandom, mapper).Handle;
    this.getRandomBatch = new GetRandomBatchTodoHandler(useCases.getRandomBatch, mapper).Handle;
    this.getByUserId = new GetTodoByUserIdHandler(useCases.getByUserId, mapper).Handle;
    this.add = new CreateTodoHandler(useCases.add, mapper).Handle;
    this.replace = new ReplaceTodoHandler(useCases.replace, mapper).Handle;
    this.update = new UpdateTodoHandler(useCases.update, mapper).Handle;
    this.delete = new DeleteTodoHandler(useCases.delete, mapper).Handle;
  }
}
