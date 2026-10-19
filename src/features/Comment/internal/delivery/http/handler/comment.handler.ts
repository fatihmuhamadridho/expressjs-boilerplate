import type { NextFunction, Request, Response } from 'express';
import {
  DummyJsonGatewayError,
  type DummyJsonResponse,
} from '../../../../../../common/dummyjson/application/dummyjson.interface';
import { writeDummyJsonResponse } from '../../../../../../common/dummyjson/delivery/write-response';
import type { CommentUseCases } from '../../../application/usecase/comment.usecases';
import { CommentMapper } from '../mapper/comment.mapper';

export class CommentHandler {
  constructor(
    private readonly useCases: CommentUseCases,
    private readonly mapper: CommentMapper
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
  getById = this.execute((r) =>
    this.useCases.getById(String(r.params.id), this.mapper.ToQueryDTO(this.mapper.ToQueryRequest(r)))
  );
  getByPostId = this.execute((r) =>
    this.useCases.getByPostId(String(r.params.postId), this.mapper.ToQueryDTO(this.mapper.ToQueryRequest(r)))
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
