import type {
  CustomResponseCommandDTO,
  CustomResponseQueryDTO,
  CustomResponseResultDTO,
} from '../dto/custom-response.dto';
import type { CustomResponseRepository } from '../custom-response.interface';

export class CustomResponseUseCases {
  constructor(private readonly repository: CustomResponseRepository) {}
  generate(command: CustomResponseCommandDTO): Promise<CustomResponseResultDTO> {
    return this.repository.generate(command);
  }
  getByIdentifier(identifier: string, query: CustomResponseQueryDTO): Promise<CustomResponseResultDTO> {
    return this.repository.getByIdentifier(identifier, query);
  }
}
