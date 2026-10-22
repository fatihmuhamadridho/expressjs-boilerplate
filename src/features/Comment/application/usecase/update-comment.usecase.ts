import type { CommentCommandDTO, CommentResultDTO } from '../dto/comment.dto';
import type { CommentRepository } from '../../domain/repository/comment.repository';

export interface UpdateCommentUseCaseInterface {
  Execute(id: string, command: CommentCommandDTO): Promise<CommentResultDTO>;
}

export class UpdateCommentUseCase implements UpdateCommentUseCaseInterface {
  constructor(private readonly repository: CommentRepository) {}

  Execute(id: string, command: CommentCommandDTO): Promise<CommentResultDTO> {
    return this.repository.update(id, command);
  }
}
