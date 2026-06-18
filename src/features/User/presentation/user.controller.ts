import type { Request, Response } from 'express';
import { UserRepository } from '../application/user.repository';

export class UserController {
  constructor(private readonly userRepository: UserRepository) {}

  async handleFindAll(req: Request, res: Response): Promise<void> {
    const page = Number(req.query.page);
    const limit = Number(req.query.limit);
    const result = await this.userRepository.findAll({
      page: Number.isFinite(page) ? page : undefined,
      limit: Number.isFinite(limit) ? limit : undefined,
    });

    res.status(200).json(result);
  }

  async handleFindById(req: Request, res: Response): Promise<void> {
    const result = await this.userRepository.findById(String(req.params.id));
    res.status(200).json(result);
  }

  async handleCreate(req: Request, res: Response): Promise<void> {
    const result = await this.userRepository.create(req.body);
    res.status(200).json(result);
  }

  async handleUpdate(req: Request, res: Response): Promise<void> {
    const result = await this.userRepository.update({
      id: String(req.params.id),
      ...req.body,
    });
    res.status(200).json(result);
  }
}
