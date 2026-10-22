import type { CustomResponseQueryDTO, CustomResponseResultDTO } from '../dto/custom-response.dto';
import type { CustomResponseRepository } from '../../domain/repository/custom-response.repository';

export interface GetCustomResponseByIdentifierUseCaseInterface {
  Execute(identifier: string, query: CustomResponseQueryDTO): Promise<CustomResponseResultDTO>;
}

export class GetCustomResponseByIdentifierUseCase implements GetCustomResponseByIdentifierUseCaseInterface {
  constructor(private readonly repository: CustomResponseRepository) {}

  Execute(identifier: string, query: CustomResponseQueryDTO): Promise<CustomResponseResultDTO> {
    return this.repository.getByIdentifier(identifier, query);
  }
}
