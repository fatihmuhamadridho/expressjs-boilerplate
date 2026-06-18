import { getPrismaService } from '@common/services/prisma.service';
import { logger } from '@common/utils/logger';
import type {
  CreateUserInput,
  UpdateUserInput,
  CreateUserResult,
  GetUserDetailResult,
  GetUserListResult,
  GetUserListInput,
  UpdateUserResult,
} from '../application/user.interface';
import { UserRepository } from '../application/user.repository';
import { USER_CODES } from './user.constants';
import { UserMapper, UserErrorMapper } from './user.mapper';

export class UserRepositoryImpl extends UserRepository {
  async create(input: CreateUserInput): Promise<CreateUserResult> {
    try {
      await getPrismaService().client.user.create({
        data: input,
      });

      return {
        status: {
          code: USER_CODES.UserSuccessCreated.code,
          message: USER_CODES.UserSuccessCreated.message,
        },
      };
    } catch (error) {
      logger.error({ error: UserErrorMapper(error) }, 'user create failed');
      return {
        status: {
          code: USER_CODES.UserInternalServerError.code,
          message: USER_CODES.UserInternalServerError.message,
        },
        details: {
          reason: error instanceof Error ? error.message : 'unknown_error',
        },
      };
    }
  }

  async update(input: UpdateUserInput): Promise<UpdateUserResult> {
    try {
      await getPrismaService().client.user.update({
        where: { id: input.id },
        data: {
          name: input.name,
          email: input.email,
          passwordHash: input.passwordHash,
        },
      });

      return {
        status: {
          code: USER_CODES.UserSuccessUpdated.code,
          message: USER_CODES.UserSuccessUpdated.message,
        },
      };
    } catch (error) {
      logger.error({ error: UserErrorMapper(error) }, 'user update failed');
      return {
        status: {
          code: USER_CODES.UserInternalServerError.code,
          message: USER_CODES.UserInternalServerError.message,
        },
        details: {
          reason: error instanceof Error ? error.message : 'unknown_error',
        },
      };
    }
  }

  async findById(id: string): Promise<GetUserDetailResult> {
    try {
      const user = await getPrismaService().client.user.findUnique({
        where: { id },
      });

      if (!user) {
        return {
          status: {
            code: USER_CODES.UserNotFound.code,
            message: USER_CODES.UserNotFound.message,
          },
          details: {
            reason: 'not_found',
          },
        };
      }

      return {
        status: {
          code: USER_CODES.UserSuccessRetrieved.code,
          message: USER_CODES.UserSuccessRetrieved.message,
        },
        data: UserMapper(user),
      };
    } catch (error) {
      logger.error({ error: UserErrorMapper(error) }, 'user findById failed');
      return {
        status: {
          code: USER_CODES.UserInternalServerError.code,
          message: USER_CODES.UserInternalServerError.message,
        },
        details: {
          reason: 'unknown_error',
        },
      };
    }
  }

  async findByEmail(email: string): Promise<GetUserDetailResult> {
    try {
      const user = await getPrismaService().client.user.findUnique({
        where: { email },
      });

      if (!user) {
        return {
          status: {
            code: USER_CODES.UserNotFound.code,
            message: USER_CODES.UserNotFound.message,
          },
          details: {
            reason: 'not_found',
          },
        };
      }

      return {
        status: {
          code: USER_CODES.UserSuccessRetrieved.code,
          message: USER_CODES.UserSuccessRetrieved.message,
        },
        data: UserMapper(user),
      };
    } catch (error) {
      logger.error({ error: UserErrorMapper(error) }, 'user findByEmail failed');
      return {
        status: {
          code: USER_CODES.UserInternalServerError.code,
          message: USER_CODES.UserInternalServerError.message,
        },
        details: {
          reason: 'unknown_error',
        },
      };
    }
  }
  async findAll(input?: GetUserListInput): Promise<GetUserListResult> {
    try {
      const page = input?.page && input.page > 0 ? input.page : 1;
      const limit = input?.limit && input.limit > 0 ? input.limit : 10;
      const skip = (page - 1) * limit;

      const [totalData, users] = await Promise.all([
        getPrismaService().client.user.count(),
        getPrismaService().client.user.findMany({
          skip,
          take: limit,
        }),
      ]);
      const totalPage = Math.max(1, Math.ceil(totalData / limit));

      return {
        status: {
          code: USER_CODES.UserSuccessRetrieved.code,
          message: USER_CODES.UserSuccessRetrieved.message,
        },
        data: users.map((user) => UserMapper(user)),
        meta: {
          page,
          limit,
          totalPage,
          totalItems: totalData,
        },
      };
    } catch (error) {
      logger.error({ error: UserErrorMapper(error) }, 'user findAll failed');
      return {
        status: {
          code: USER_CODES.UserInternalServerError.code,
          message: USER_CODES.UserInternalServerError.message,
        },
        details: {
          reason: 'unknown_error',
        },
      };
    }
  }
}
