import type { PostCommandDTO, PostResultDTO } from '../dto/post.dto';
import type { PostRepository } from '../../domain/repository/post.repository';

export interface ReplacePostUseCaseInterface {
  Execute(id: string, command: PostCommandDTO): Promise<PostResultDTO>;
}

export class ReplacePostUseCase implements ReplacePostUseCaseInterface {
  constructor(private readonly repository: PostRepository) {}

  Execute(id: string, command: PostCommandDTO): Promise<PostResultDTO> {
    return this.repository.replace(id, command);
  }
}
