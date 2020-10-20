import * as express from 'express';
import * as jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import passport from 'passport';

import config from '../config';
import UserRepository from '../repositories/userRepository';
import UserSchema from '../models/user';

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
    const hashedPassword = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));

    await UserSchema.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      username: req.body.username,
      password: hashedPassword,
    });

    const token = jwt.sign(
      { username: req.body.username, scope: req.body.scope },
      config.jwtSecret,
    );
    res.status(200).send({ token });
  }

  public static login(
    _req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) {
    passport.authenticate('local', (err, user) => {
      // no async/await because passport works only with callback ..
      if (err) return next(err);
      if (!user) {
        return res.status(401);
      }
      const token = jwt.sign({ username: user.username }, config.jwtSecret);
      // algorithm: 'RS256',
      //   expiresIn: 120,
      //   subject: userId
      // }
      // res.cookie("SESSIONID", jwtBearerToken, { httpOnly: true, secure: true });
      return res.status(200).send({ token });
    });
  }
}

export default UserController;
