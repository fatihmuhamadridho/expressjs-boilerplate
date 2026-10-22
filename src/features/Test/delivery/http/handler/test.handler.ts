import type { RequestHandler } from 'express';
import { GetTestHandler } from './get-test.handler';
import { PostTestHandler } from './post-test.handler';
import { PutTestHandler } from './put-test.handler';
import { PatchTestHandler } from './patch-test.handler';
import { DeleteTestHandler } from './delete-test.handler';
import type {
  GetTestUseCaseInterface,
  PostTestUseCaseInterface,
  PutTestUseCaseInterface,
  PatchTestUseCaseInterface,
  DeleteTestUseCaseInterface,
} from '../../../application/usecase/test.usecases';
import type { TestMapper } from '../mapper/test.mapper';

export interface TestUseCases {
  get: GetTestUseCaseInterface;
  post: PostTestUseCaseInterface;
  put: PutTestUseCaseInterface;
  patch: PatchTestUseCaseInterface;
  delete: DeleteTestUseCaseInterface;
}

export class TestHandler {
  readonly get: RequestHandler;
  readonly post: RequestHandler;
  readonly put: RequestHandler;
  readonly patch: RequestHandler;
  readonly delete: RequestHandler;

  constructor(useCases: TestUseCases, mapper: TestMapper) {
    this.get = new GetTestHandler(useCases.get, mapper).Handle;
    this.post = new PostTestHandler(useCases.post, mapper).Handle;
    this.put = new PutTestHandler(useCases.put, mapper).Handle;
    this.patch = new PatchTestHandler(useCases.patch, mapper).Handle;
    this.delete = new DeleteTestHandler(useCases.delete, mapper).Handle;
  }
}
