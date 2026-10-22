import type { IconQueryDTO, IconResultDTO } from '../dto/icon.dto';
import type { IconRepository } from '../../domain/repository/icon.repository';

export interface GetDefaultIconUseCaseInterface {
  Execute(query: IconQueryDTO): Promise<IconResultDTO>;
}

export class GetDefaultIconUseCase implements GetDefaultIconUseCaseInterface {
  constructor(private readonly repository: IconRepository) {}

  Execute(query: IconQueryDTO): Promise<IconResultDTO> {
    return this.repository.getDefault(query);
  }
}
