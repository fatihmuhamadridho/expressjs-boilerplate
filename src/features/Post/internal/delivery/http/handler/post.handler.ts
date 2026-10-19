import type { NextFunction, Request, Response } from 'express';
import {
  DummyJsonGatewayError,
  type DummyJsonResponse,
} from '../../../../../../common/dummyjson/application/dummyjson.interface';
import { writeDummyJsonResponse } from '../../../../../../common/dummyjson/delivery/write-response';
import type { PostUseCases } from '../../../application/usecase/post.usecases';
import { PostMapper } from '../mapper/post.mapper';

export class PostHandler {
  constructor(
    private readonly useCases: PostUseCases,
    private readonly mapper: PostMapper
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

  getAll = this.execute((request) => this.useCases.getAll(this.mapper.ToQueryDTO(this.mapper.ToQueryRequest(request))));
  search = this.execute((request) => this.useCases.search(this.mapper.ToQueryDTO(this.mapper.ToQueryRequest(request))));
  getTagList = this.execute((request) =>
    this.useCases.getTagList(this.mapper.ToQueryDTO(this.mapper.ToQueryRequest(request)))
  );
  getTags = this.execute((request) =>
    this.useCases.getTags(this.mapper.ToQueryDTO(this.mapper.ToQueryRequest(request)))
  );
  getByTag = this.execute((request) =>
    this.useCases.getByTag(String(request.params.tag), this.mapper.ToQueryDTO(this.mapper.ToQueryRequest(request)))
  );
  getByUserId = this.execute((request) =>
    this.useCases.getByUserId(
      String(request.params.userId),
      this.mapper.ToQueryDTO(this.mapper.ToQueryRequest(request))
    )
  );
  getComments = this.execute((request) =>
    this.useCases.getComments(
      String(request.params.postId),
      this.mapper.ToQueryDTO(this.mapper.ToQueryRequest(request))
    )
  );
  getById = this.execute((request) =>
    this.useCases.getById(String(request.params.id), this.mapper.ToQueryDTO(this.mapper.ToQueryRequest(request)))
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
