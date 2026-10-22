import type { PostCommandDTO, PostResultDTO } from '../dto/post.dto';
import type { PostRepository } from '../../domain/repository/post.repository';

export interface DeletePostUseCaseInterface {
  Execute(id: string, command: PostCommandDTO): Promise<PostResultDTO>;
}

export class DeletePostUseCase implements DeletePostUseCaseInterface {
  constructor(private readonly repository: PostRepository) {}

  Execute(id: string, command: PostCommandDTO): Promise<PostResultDTO> {
    return this.repository.delete(id, command);
  }
}
