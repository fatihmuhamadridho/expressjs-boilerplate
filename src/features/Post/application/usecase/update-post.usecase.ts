import type { PostCommandDTO, PostResultDTO } from '../dto/post.dto';
import type { PostRepository } from '../../domain/repository/post.repository';

export interface UpdatePostUseCaseInterface {
  Execute(id: string, command: PostCommandDTO): Promise<PostResultDTO>;
}

export class UpdatePostUseCase implements UpdatePostUseCaseInterface {
  constructor(private readonly repository: PostRepository) {}

  Execute(id: string, command: PostCommandDTO): Promise<PostResultDTO> {
    return this.repository.update(id, command);
  }
}
