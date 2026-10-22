import type { CommentQueryDTO, CommentResultDTO } from '../dto/comment.dto';
import type { CommentRepository } from '../../domain/repository/comment.repository';

export interface GetCommentListUseCaseInterface {
  Execute(query: CommentQueryDTO): Promise<CommentResultDTO>;
}

export class GetCommentListUseCase implements GetCommentListUseCaseInterface {
  constructor(private readonly repository: CommentRepository) {}

  Execute(query: CommentQueryDTO): Promise<CommentResultDTO> {
    return this.repository.getAll(query);
  }
}
