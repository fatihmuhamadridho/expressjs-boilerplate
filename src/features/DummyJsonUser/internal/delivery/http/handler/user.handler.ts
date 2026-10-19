import type { NextFunction, Request, Response } from 'express';
import {
  DummyJsonGatewayError,
  type DummyJsonResponse,
} from '../../../../../../common/dummyjson/application/dummyjson.interface';
import { writeDummyJsonResponse } from '../../../../../../common/dummyjson/delivery/write-response';
import type { UserUseCases } from '../../../application/usecase/user.usecases';
import { UserMapper } from '../mapper/user.mapper';

export class UserHandler {
  constructor(
    private readonly useCases: UserUseCases,
    private readonly mapper: UserMapper
  ) {}
  private execute =
    (work: (request: Request) => Promise<DummyJsonResponse>) =>
    async (request: Request, response: Response, next: NextFunction): Promise<void> => {
      try {
        writeDummyJsonResponse(response, await work(request));
      } catch (error) {
        if (error instanceof DummyJsonGatewayError) {
          response.status(error.kind === 'timeout' ? 504 : 502).json({ message: error.message });
          return;
        }
        next(error);
      }
    };
  getAll = this.execute((r) => this.useCases.getAll(this.mapper.ToQueryDTO(this.mapper.ToQueryRequest(r))));
  search = this.execute((r) => this.useCases.search(this.mapper.ToQueryDTO(this.mapper.ToQueryRequest(r))));
  filter = this.execute((r) => this.useCases.filter(this.mapper.ToQueryDTO(this.mapper.ToQueryRequest(r))));
  getCurrentUser = this.execute((r) =>
    this.useCases.getCurrentUser(this.mapper.ToQueryDTO(this.mapper.ToQueryRequest(r)))
  );
  getById = this.execute((r) =>
    this.useCases.getById(String(r.params.id), this.mapper.ToQueryDTO(this.mapper.ToQueryRequest(r)))
  );
  getCarts = this.execute((r) =>
    this.useCases.getCarts(String(r.params.userId), this.mapper.ToQueryDTO(this.mapper.ToQueryRequest(r)))
  );
  getPosts = this.execute((r) =>
    this.useCases.getPosts(String(r.params.userId), this.mapper.ToQueryDTO(this.mapper.ToQueryRequest(r)))
  );
  getTodos = this.execute((r) =>
    this.useCases.getTodos(String(r.params.userId), this.mapper.ToQueryDTO(this.mapper.ToQueryRequest(r)))
  );
  add = this.execute((r) => this.useCases.add(this.mapper.ToCommandDTO(this.mapper.ToCommandRequest(r))));
  login = this.execute((r) => this.useCases.login(this.mapper.ToCommandDTO(this.mapper.ToCommandRequest(r))));
  replace = this.execute((r) =>
    this.useCases.replace(String(r.params.id), this.mapper.ToCommandDTO(this.mapper.ToCommandRequest(r)))
  );
  update = this.execute((r) =>
    this.useCases.update(String(r.params.id), this.mapper.ToCommandDTO(this.mapper.ToCommandRequest(r)))
  );
  delete = this.execute((r) =>
    this.useCases.delete(String(r.params.id), this.mapper.ToCommandDTO(this.mapper.ToCommandRequest(r)))
  );
}
