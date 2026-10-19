import type { IconQueryDTO, IconResultDTO } from '../dto/icon.dto';
import type { IconRepository } from '../icon.interface';

export class IconUseCases {
  constructor(private readonly repository: IconRepository) {}
  getDefault(query: IconQueryDTO): Promise<IconResultDTO> {
    return this.repository.getDefault(query);
  }
  getByHash(hash: string, query: IconQueryDTO): Promise<IconResultDTO> {
    return this.repository.getByHash(hash, query);
  }
  getByHashAndSize(hash: string, size: string, query: IconQueryDTO): Promise<IconResultDTO> {
    return this.repository.getByHashAndSize(hash, size, query);
  }
}
