import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { httpLogger } from '@common/utils/httpLogger';
import { logger } from '@common/utils/logger';
import { UserController, UserRepositoryImpl, createUserRouter } from '@features/User';

dotenv.config();

const app = express();
const userRepository = new UserRepositoryImpl();
const userController = new UserController(userRepository);

app.use(cors());
app.use(express.json());
app.use(httpLogger);
app.use(createUserRouter(userController));

app.get('/', (_req: Request, res: Response) => {
  res.json({
    message: 'Express + TypeScript jalan asd',
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  logger.info(`Server running on http://localhost:${PORT}`);
});
