import type { NextFunction, Request, Response } from 'express';
import {
  DummyJsonGatewayError,
  type DummyJsonResponse,
} from '../../../../../../common/dummyjson/application/dummyjson.interface';
import { InvalidCartIdError } from '../../../../domain/valueobject/cart-id';
import type { CartUseCaseInterface } from '../../../application/usecase/cart.usecases';
import { writeDummyJsonResponse } from '../../../../../../common/dummyjson/delivery/write-response';
import { CartMapper } from '../mapper/cart.mapper';

export class CartHandler {
  constructor(
    private readonly useCases: CartUseCaseInterface,
    private readonly mapper: CartMapper
  ) {}
  private execute =
    (work: (request: Request) => Promise<DummyJsonResponse>) =>
    async (request: Request, response: Response, next: NextFunction): Promise<void> => {
      try {
        writeDummyJsonResponse(response, await work(request));
      } catch (error) {
        if (error instanceof InvalidCartIdError) {
          response.status(400).json({ message: error.message });
          return;
        }
        if (error instanceof DummyJsonGatewayError) {
          response.status(error.kind === 'timeout' ? 504 : 502).json({ message: error.message });
          return;
        }
        next(error);
      }
    };
  getAll = this.execute((request) => this.useCases.getAll(this.mapper.ToQueryDTO(this.mapper.ToQueryRequest(request))));
  getById = this.execute((request) =>
    this.useCases.getById(String(request.params.id), this.mapper.ToQueryDTO(this.mapper.ToQueryRequest(request)))
  );
  getByUserId = this.execute((request) =>
    this.useCases.getByUserId(
      String(request.params.userId),
      this.mapper.ToQueryDTO(this.mapper.ToQueryRequest(request))
    )
  );
  add = this.execute((request) => this.useCases.add(this.mapper.ToCommandDTO(this.mapper.ToCommandRequest(request))));
  replace = this.execute((request) =>
    this.useCases.replace(String(request.params.id), this.mapper.ToCommandDTO(this.mapper.ToCommandRequest(request)))
  );
  update = this.execute((request) =>
    this.useCases.update(String(request.params.id), this.mapper.ToCommandDTO(this.mapper.ToCommandRequest(request)))
  );
  delete = this.execute((request) =>
    this.useCases.delete(String(request.params.id), this.mapper.ToCommandDTO(this.mapper.ToCommandRequest(request)))
  );
}
