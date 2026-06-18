export const USER_CODES = {
  UserSuccessRetrieved: {
    code: 'USR200001',
    message: 'Success retrieved user',
  },
  UserSuccessUpdated: {
    code: 'USR200002',
    message: 'Success updated user',
  },
  UserSuccessCreated: {
    code: 'USR201001',
    message: 'Success created user',
  },
  UserNotFound: {
    code: 'USR404001',
    message: 'User not found',
  },
  UserInternalServerError: {
    code: 'USR500001',
    message: 'Internal server error',
  },
} as const;
