import type { CommentCommandDTO, CommentResultDTO } from '../dto/comment.dto';
import type { CommentRepository } from '../../domain/repository/comment.repository';

export interface ReplaceCommentUseCaseInterface {
  Execute(id: string, command: CommentCommandDTO): Promise<CommentResultDTO>;
}

export class ReplaceCommentUseCase implements ReplaceCommentUseCaseInterface {
  constructor(private readonly repository: CommentRepository) {}

  Execute(id: string, command: CommentCommandDTO): Promise<CommentResultDTO> {
    return this.repository.replace(id, command);
  }
}
