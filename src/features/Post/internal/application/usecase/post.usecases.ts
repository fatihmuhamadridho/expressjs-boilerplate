import type { PostCommandDTO, PostQueryDTO, PostResultDTO } from '../dto/post.dto';
import type { PostRepository } from '../post.interface';

export class PostUseCases {
  constructor(private readonly repository: PostRepository) {}
  getAll(query: PostQueryDTO): Promise<PostResultDTO> {
    return this.repository.getAll(query);
  }
  search(query: PostQueryDTO): Promise<PostResultDTO> {
    return this.repository.search(query);
  }
  getTagList(query: PostQueryDTO): Promise<PostResultDTO> {
    return this.repository.getTagList(query);
  }
  getTags(query: PostQueryDTO): Promise<PostResultDTO> {
    return this.repository.getTags(query);
  }
  getByTag(tag: string, query: PostQueryDTO): Promise<PostResultDTO> {
    return this.repository.getByTag(tag, query);
  }
  getByUserId(userId: string, query: PostQueryDTO): Promise<PostResultDTO> {
    return this.repository.getByUserId(userId, query);
  }
  getComments(postId: string, query: PostQueryDTO): Promise<PostResultDTO> {
    return this.repository.getComments(postId, query);
  }
  getById(id: string, query: PostQueryDTO): Promise<PostResultDTO> {
    return this.repository.getById(id, query);
  }
  add(command: PostCommandDTO): Promise<PostResultDTO> {
    return this.repository.add(command);
  }
  replace(id: string, command: PostCommandDTO): Promise<PostResultDTO> {
    return this.repository.replace(id, command);
  }
  update(id: string, command: PostCommandDTO): Promise<PostResultDTO> {
    return this.repository.update(id, command);
  }
  delete(id: string, command: PostCommandDTO): Promise<PostResultDTO> {
    return this.repository.delete(id, command);
  }
}
