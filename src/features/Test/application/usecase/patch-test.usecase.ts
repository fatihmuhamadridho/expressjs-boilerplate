import type { TestCommandDTO, TestResultDTO } from '../dto/test.dto';
import type { TestRepository } from '../../domain/repository/test.repository';

export interface PatchTestUseCaseInterface {
  Execute(command: TestCommandDTO): Promise<TestResultDTO>;
}

export class PatchTestUseCase implements PatchTestUseCaseInterface {
  constructor(private readonly repository: TestRepository) {}

  Execute(command: TestCommandDTO): Promise<TestResultDTO> {
    return this.repository.patch(command);
  }
}
