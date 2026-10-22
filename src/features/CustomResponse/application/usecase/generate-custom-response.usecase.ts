import type { CustomResponseCommandDTO, CustomResponseResultDTO } from '../dto/custom-response.dto';
import type { CustomResponseRepository } from '../../domain/repository/custom-response.repository';

export interface GenerateCustomResponseUseCaseInterface {
  Execute(command: CustomResponseCommandDTO): Promise<CustomResponseResultDTO>;
}

export class GenerateCustomResponseUseCase implements GenerateCustomResponseUseCaseInterface {
  constructor(private readonly repository: CustomResponseRepository) {}

  Execute(command: CustomResponseCommandDTO): Promise<CustomResponseResultDTO> {
    return this.repository.generate(command);
  }
}
