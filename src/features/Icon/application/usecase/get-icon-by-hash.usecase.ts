import type { IconQueryDTO, IconResultDTO } from '../dto/icon.dto';
import type { IconRepository } from '../../domain/repository/icon.repository';

export interface GetIconByHashUseCaseInterface {
  Execute(hash: string, query: IconQueryDTO): Promise<IconResultDTO>;
}

export class GetIconByHashUseCase implements GetIconByHashUseCaseInterface {
  constructor(private readonly repository: IconRepository) {}

  Execute(hash: string, query: IconQueryDTO): Promise<IconResultDTO> {
    return this.repository.getByHash(hash, query);
  }
}
