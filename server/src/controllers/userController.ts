import { Request, Response } from 'express';

import UserRepository from '../repositories/userRepository';

class UserController {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  public async get(_req: Request, res: Response) {
    const users = await this.userRepository
      .getMany()
      .catch((err) => res.status(500).send(err));

    return res.json(users);
  }
}

export default UserController;
