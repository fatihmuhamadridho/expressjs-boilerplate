import type { TestQueryDTO, TestResultDTO } from '../dto/test.dto';
import type { TestRepository } from '../../domain/repository/test.repository';

export interface GetTestUseCaseInterface {
  Execute(query: TestQueryDTO): Promise<TestResultDTO>;
}

export class GetTestUseCase implements GetTestUseCaseInterface {
  constructor(private readonly repository: TestRepository) {}

  Execute(query: TestQueryDTO): Promise<TestResultDTO> {
    return this.repository.get(query);
  }
}
