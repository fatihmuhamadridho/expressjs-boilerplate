import type {
  CreateUserInput,
  CreateUserResult,
  GetUserDetailResult,
  GetUserListInput,
  GetUserListResult,
  UpdateUserInput,
  UpdateUserResult,
} from './user.interface';

export abstract class UserRepository {
  abstract create(input: CreateUserInput): Promise<CreateUserResult>;
  abstract update(input: UpdateUserInput): Promise<UpdateUserResult>;
  abstract findById(id: string): Promise<GetUserDetailResult>;
  abstract findByEmail(email: string): Promise<GetUserDetailResult>;
  abstract findAll(input?: GetUserListInput): Promise<GetUserListResult>;
}
