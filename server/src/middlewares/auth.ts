import { NextFunction, Request, Response } from 'express';
import passport from 'passport';

import { UserModel } from '../models/user';

class Auth {
  public static authenticateJWT(req: Request, res: Response, next: NextFunction) {
    passport.authenticate('JWT', (err, user: UserModel) => {
      if (err) {
        return res.status(500).send(err);
      }

      if (!user) {
        return res.status(401).json({ error: ['User not found!'] });
      }

      req.authenticatedUser = user;

      return next();
    })(req, res, next);
  }

  public static authorizeJWT(req: Request, res: Response, next: NextFunction) {
    passport.authenticate('JWT', (err, user: UserModel) => {
      if (err) {
        return res.status(500).send(err);
      }

      if (!user) {
        return res.status(401).json({ error: ['User not found!'] });
      }

      if (user.roles.indexOf('admin') < 0) {
        return res.status(403).json({ error: ['User not admin!'] });
      }

      req.authenticatedUser = user;

      return next();
    })(req, res, next);
  }
}

export default Auth;
