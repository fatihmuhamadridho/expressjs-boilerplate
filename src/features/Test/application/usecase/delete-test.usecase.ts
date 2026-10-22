import type { TestCommandDTO, TestResultDTO } from '../dto/test.dto';
import type { TestRepository } from '../../domain/repository/test.repository';

export interface DeleteTestUseCaseInterface {
  Execute(command: TestCommandDTO): Promise<TestResultDTO>;
}

export class DeleteTestUseCase implements DeleteTestUseCaseInterface {
  constructor(private readonly repository: TestRepository) {}

  Execute(command: TestCommandDTO): Promise<TestResultDTO> {
    return this.repository.delete(command);
  }
}
