import express from 'express';
import jwt from 'jsonwebtoken';

import UserRepository from '../repositories/userRepository';
import UserSchema from '../models/user';
import Locals from '../providers/locals';

class UserController {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  public async get(_req: express.Request, res: express.Response) {
    const users = await this.userRepository.get().catch((err) => res.send(err));
    return res.json(users);
  }

  public static async register(req: express.Request, res: express.Response) {
    const {
      email, password, firstName, lastName,
    } = req.body;

    const user = new UserSchema({
      email,
      password,
      firstName,
      lastName,
    });

    UserSchema.findOne({ email }, (err, existingUser) => {
      if (err) {
        return res.json({
          error: err,
        });
      }

      if (existingUser) {
        return res.json({
          error: ['Account with the e-mail address already exists.'],
        });
      }

      return user.save((_err: Error) => {
        if (_err) {
          return res.json({
            error: _err,
          });
        }

        const token = jwt.sign(
          { email, password },
          Locals.config().appSecret,
          { expiresIn: Locals.config().jwtExpiresIn * 60 },
        );

        // Hide protected columns
        user.password = '';

        return res.json({
          user,
          token,
          token_expires_in: Locals.config().jwtExpiresIn * 60,
        });
      });
    });
  }

  public static login(
    req: express.Request,
    res: express.Response,
  ) {
    const email = req.body.email.toLowerCase();
    const { password } = req.body;

    UserSchema.findOne({ email }, (err, user) => {
      if (err) {
        return res.status(401).json({
          error: err,
        });
      }

      if (!user) {
        return res.status(401).json({
          error: ['User not found!'],
        });
      }

      if (!user.password) {
        return res.status(401).json({
          error: ['Please login using your social creds'],
        });
      }
      debugger;

      return user.comparePassword(password, (_err: Error, isMatch: boolean) => {
        debugger;
        if (_err) {
          return res.json({ error: _err });
        }

        if (!isMatch) {
          return res.json({
            error: ['Password does not match!'],
          });
        }

        const token = jwt.sign(
          { email, password },
          Locals.config().appSecret,
          { expiresIn: Locals.config().jwtExpiresIn * 60 },
        );

        // Hide protected columns
        user.password = '';

        return res.json({
          user,
          token,
          token_expires_in: Locals.config().jwtExpiresIn * 60,
        });
      });
    });
  }
}

export default UserController;
