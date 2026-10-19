import type { TestCommandDTO, TestQueryDTO, TestResultDTO } from '../dto/test.dto';
import type { TestRepository } from '../test.interface';

export class TestUseCases {
  constructor(private readonly repository: TestRepository) {}
  get(query: TestQueryDTO): Promise<TestResultDTO> {
    return this.repository.get(query);
  }
  post(command: TestCommandDTO): Promise<TestResultDTO> {
    return this.repository.post(command);
  }
  put(command: TestCommandDTO): Promise<TestResultDTO> {
    return this.repository.put(command);
  }
  patch(command: TestCommandDTO): Promise<TestResultDTO> {
    return this.repository.patch(command);
  }
  delete(command: TestCommandDTO): Promise<TestResultDTO> {
    return this.repository.delete(command);
  }
}
