import type { TestCommandDTO, TestResultDTO } from '../dto/test.dto';
import type { TestRepository } from '../../domain/repository/test.repository';

export interface PutTestUseCaseInterface {
  Execute(command: TestCommandDTO): Promise<TestResultDTO>;
}

export class PutTestUseCase implements PutTestUseCaseInterface {
  constructor(private readonly repository: TestRepository) {}

  Execute(command: TestCommandDTO): Promise<TestResultDTO> {
    return this.repository.put(command);
  }
}
