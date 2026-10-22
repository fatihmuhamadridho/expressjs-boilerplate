import type { CommentQueryDTO, CommentResultDTO } from '../dto/comment.dto';
import type { CommentRepository } from '../../domain/repository/comment.repository';

export interface GetCommentDetailUseCaseInterface {
  Execute(id: string, query: CommentQueryDTO): Promise<CommentResultDTO>;
}

export class GetCommentDetailUseCase implements GetCommentDetailUseCaseInterface {
  constructor(private readonly repository: CommentRepository) {}

  Execute(id: string, query: CommentQueryDTO): Promise<CommentResultDTO> {
    return this.repository.getById(id, query);
  }
}
