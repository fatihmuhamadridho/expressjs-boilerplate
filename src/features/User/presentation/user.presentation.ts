import { Router } from 'express';
import type { UserController } from './user.controller';

export function createUserRouter(userController: UserController): Router {
  const router = Router();

  router.get('/users', userController.handleFindAll.bind(userController));
  router.get('/users/:id', userController.handleFindById.bind(userController));
  router.post('/users', userController.handleCreate.bind(userController));
  router.patch('/users/:id', userController.handleUpdate.bind(userController));

  return router;
}
