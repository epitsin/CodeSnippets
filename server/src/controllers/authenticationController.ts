import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import UserRepository from '../repositories/userRepository';
import { UserModel } from '../models/user';
import Locals from '../providers/locals';
import { UserDto } from '../interfaces/dtos/userDto';

class AuthenticationController {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  public async register(req: Request, res: Response) {
    const user = req.body as UserDto;

    try {
      const existingUser = await this.userRepository.getOne({ email: user.email });
      if (existingUser) {
        return res.status(401).json({
          error: ['Account with the e-mail address already exists.'],
        });
      }

      const createdUser = await this.userRepository.create(user);
      const token = AuthenticationController.createJwtToken(createdUser);

      return res.json({
        token,
        expiresIn: Locals.config().jwtExpiresIn * 60,
      });
    } catch (err) {
      return res.status(500).send(err);
    }
  }

  public async login(req: Request, res: Response) {
    const user = req.body as UserDto;

    try {
      const existingUser = await this.userRepository.getOne({ email: user.email });
      if (!existingUser) {
        return res.status(401).json({ error: ['User not found!'] });
      }

      if (!existingUser.password) {
        return res.status(401).json({
          error: ['Please login using your social creds'],
        });
      }

      return existingUser.comparePassword(user.password, (_err: Error, isMatch: boolean) => {
        if (_err) {
          return res.status(500).send(_err);
        }

        if (!isMatch) {
          return res.status(401).json({ error: ['Password does not match!'] });
        }

        const token = AuthenticationController.createJwtToken(existingUser);

        return res.json({
          token,
          expiresIn: Locals.config().jwtExpiresIn * 60,
        });
      });
    } catch (err) {
      return res.status(500).send(err);
    }
  }

  private static createJwtToken(user: UserModel) {
    return jwt.sign(
      {
        _id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        roles: user.roles,
      },
      Locals.config().appSecret,
      { expiresIn: Locals.config().jwtExpiresIn * 60 },
    );
  }
}

export default AuthenticationController;
