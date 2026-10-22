import type { PostCommandDTO, PostResultDTO } from '../dto/post.dto';
import type { PostRepository } from '../../domain/repository/post.repository';

export interface CreatePostUseCaseInterface {
  Execute(command: PostCommandDTO): Promise<PostResultDTO>;
}

export class CreatePostUseCase implements CreatePostUseCaseInterface {
  constructor(private readonly repository: PostRepository) {}

  Execute(command: PostCommandDTO): Promise<PostResultDTO> {
    return this.repository.add(command);
  }
}
