import type { NextFunction, Request, Response } from 'express';
import {
  DummyJsonGatewayError,
  type DummyJsonResponse,
} from '../../../../../../common/dummyjson/application/dummyjson.interface';
import { writeDummyJsonResponse } from '../../../../../../common/dummyjson/delivery/write-response';
import type { RecipeUseCases } from '../../../application/usecase/recipe.usecases';
import { RecipeMapper } from '../mapper/recipe.mapper';

export class RecipeHandler {
  constructor(
    private readonly useCases: RecipeUseCases,
    private readonly mapper: RecipeMapper
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
  getTags = this.execute((r) => this.useCases.getTags(this.mapper.ToQueryDTO(this.mapper.ToQueryRequest(r))));
  getByTag = this.execute((r) =>
    this.useCases.getByTag(String(r.params.tag), this.mapper.ToQueryDTO(this.mapper.ToQueryRequest(r)))
  );
  getByMealType = this.execute((r) =>
    this.useCases.getByMealType(String(r.params.mealType), this.mapper.ToQueryDTO(this.mapper.ToQueryRequest(r)))
  );
  getById = this.execute((r) =>
    this.useCases.getById(String(r.params.id), this.mapper.ToQueryDTO(this.mapper.ToQueryRequest(r)))
  );
  add = this.execute((r) => this.useCases.add(this.mapper.ToCommandDTO(this.mapper.ToCommandRequest(r))));
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
