import type { IconQueryDTO, IconResultDTO } from '../dto/icon.dto';
import type { IconRepository } from '../../domain/repository/icon.repository';

export interface GetIconByHashAndSizeUseCaseInterface {
  Execute(hash: string, size: string, query: IconQueryDTO): Promise<IconResultDTO>;
}

export class GetIconByHashAndSizeUseCase implements GetIconByHashAndSizeUseCaseInterface {
  constructor(private readonly repository: IconRepository) {}

  Execute(hash: string, size: string, query: IconQueryDTO): Promise<IconResultDTO> {
    return this.repository.getByHashAndSize(hash, size, query);
  }
}
