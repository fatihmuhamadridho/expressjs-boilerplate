import type { CommentCommandDTO, CommentQueryDTO, CommentResultDTO } from '../dto/comment.dto';
import type { CommentRepository } from '../comment.interface';

export class CommentUseCases {
  constructor(private readonly repository: CommentRepository) {}
  getAll(query: CommentQueryDTO): Promise<CommentResultDTO> {
    return this.repository.getAll(query);
  }
  getById(id: string, query: CommentQueryDTO): Promise<CommentResultDTO> {
    return this.repository.getById(id, query);
  }
  getByPostId(postId: string, query: CommentQueryDTO): Promise<CommentResultDTO> {
    return this.repository.getByPostId(postId, query);
  }
  add(command: CommentCommandDTO): Promise<CommentResultDTO> {
    return this.repository.add(command);
  }
  replace(id: string, command: CommentCommandDTO): Promise<CommentResultDTO> {
    return this.repository.replace(id, command);
  }
  update(id: string, command: CommentCommandDTO): Promise<CommentResultDTO> {
    return this.repository.update(id, command);
  }
  delete(id: string, command: CommentCommandDTO): Promise<CommentResultDTO> {
    return this.repository.delete(id, command);
  }
}
