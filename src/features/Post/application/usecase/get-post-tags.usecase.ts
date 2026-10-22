import type { PostQueryDTO, PostResultDTO } from '../dto/post.dto';
import type { PostRepository } from '../../domain/repository/post.repository';

export interface GetPostTagsUseCaseInterface {
  Execute(query: PostQueryDTO): Promise<PostResultDTO>;
}

export class GetPostTagsUseCase implements GetPostTagsUseCaseInterface {
  constructor(private readonly repository: PostRepository) {}

  Execute(query: PostQueryDTO): Promise<PostResultDTO> {
    return this.repository.getTags(query);
  }
}
