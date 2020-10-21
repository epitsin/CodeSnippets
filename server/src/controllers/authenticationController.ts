import { NextFunction, Request, Response } from 'express';
import passport from 'passport';
import { UserModel } from '../models/user';

class AuthenticationController {
  public static authenticateJWT(req: Request, res: Response, next: NextFunction) {
    passport.authenticate('JWT', (err, user: UserModel) => {
      if (err) {
        console.log(err);
        return res.status(401).json({ status: 'error', code: 'unauthorized' });
      }

      if (!user) {
        return res.status(401).json({ status: 'error', code: 'unauthorized' });
      }

      req.authenticatedUser = user;

      return next();
    })(req, res, next);
  }
}

export default AuthenticationController;
