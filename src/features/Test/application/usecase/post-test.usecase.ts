import type { TestCommandDTO, TestResultDTO } from '../dto/test.dto';
import type { TestRepository } from '../../domain/repository/test.repository';

export interface PostTestUseCaseInterface {
  Execute(command: TestCommandDTO): Promise<TestResultDTO>;
}

export class PostTestUseCase implements PostTestUseCaseInterface {
  constructor(private readonly repository: TestRepository) {}

  Execute(command: TestCommandDTO): Promise<TestResultDTO> {
    return this.repository.post(command);
  }
}
