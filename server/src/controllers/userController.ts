import express from 'express';
import jwt from 'jsonwebtoken';

import UserRepository from '../repositories/userRepository';
import { UserModel } from '../models/user';
import Locals from '../providers/locals';
import { UserDto } from '../interfaces/dtos/userDto';

class UserController {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  public async get(_req: express.Request, res: express.Response) {
    const users = await this.userRepository.getMany().catch((err) => res.send(err));
    return res.json(users);
  }

  public async register(req: express.Request, res: express.Response) {
    const user = req.body as UserDto;

    try {
      const existingUser = await this.userRepository.getOne({ email: user.email });
      if (existingUser) {
        return res.status(401).json({
          error: ['Account with the e-mail address already exists.'],
        });
      }

      const createdUser = await this.userRepository.create(user);
      const token = UserController.createJwtToken(createdUser);

      return res.json({
        token,
        expiresIn: Locals.config().jwtExpiresIn * 60,
      });
    } catch (err) {
      return res.status(500).json({
        error: err,
      });
    }
  }

  public async login(
    req: express.Request,
    res: express.Response,
  ) {
    const user = req.body as UserDto;

    try {
      const existingUser = await this.userRepository.getOne({ email: user.email });
      if (!existingUser) {
        return res.status(401).json({
          error: ['User not found!'],
        });
      }

      if (!existingUser.password) {
        return res.status(401).json({
          error: ['Please login using your social creds'],
        });
      }

      return existingUser.comparePassword(user.password, (_err: Error, isMatch: boolean) => {
        if (_err) {
          console.log(_err);
          return res.status(500).json({ error: _err });
        }

        if (!isMatch) {
          return res.status(401).json({
            error: ['Password does not match!'],
          });
        }

        const token = UserController.createJwtToken(existingUser);

        return res.json({
          token,
          expiresIn: Locals.config().jwtExpiresIn * 60,
        });
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        error: err,
      });
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

export default UserController;
