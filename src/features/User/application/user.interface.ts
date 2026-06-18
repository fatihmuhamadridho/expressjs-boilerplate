import type { User } from './user.dto.model';

export type CreateUserInput = {
  name: string;
  email: string;
  passwordHash: string;
};

export type UpdateUserInput = {
  id: string;
  name?: string;
  email?: string;
  passwordHash?: string;
};

export interface GetUserListInput {
  page?: number;
  limit?: number;
}

export type UserResponseStatus = {
  code: string;
  message: string;
};

export type UserResponseMeta = Record<string, never>;

export type GetUserListMeta = {
  page: number;
  limit: number;
  totalPage: number;
  totalItems: number;
};

export type UserErrorDetails = {
  reason?: string;
};

export type CreateUserSuccessResult = {
  status: UserResponseStatus;
  details?: UserErrorDetails;
};

export type UpdateUserSuccessResult = {
  status: UserResponseStatus;
  details?: UserErrorDetails;
};

export type GetUserDetailSuccessResult = {
  status: UserResponseStatus;
  data: User;
};

export type GetUserListSuccessResult = {
  status: UserResponseStatus;
  data: User[];
  meta: GetUserListMeta;
};

export type UserErrorResult = {
  status: UserResponseStatus;
  details?: UserErrorDetails;
};

export type CreateUserResult = CreateUserSuccessResult | UserErrorResult;
export type UpdateUserResult = UpdateUserSuccessResult | UserErrorResult;
export type GetUserDetailResult = GetUserDetailSuccessResult | UserErrorResult;
export type GetUserListResult = GetUserListSuccessResult | UserErrorResult;
