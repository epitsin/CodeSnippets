import { NextFunction, Request, Response } from 'express';
import passport from 'passport';

class AuthenticationController {
  public static authenticateJWT(req: Request, res: Response, next: NextFunction) {
    passport.authenticate('jwt', (err, user) => {
      if (err) {
        console.log(err);
        return res.status(401).json({ status: 'error', code: 'unauthorized' });
      }
      if (!user) {
        return res.status(401).json({ status: 'error', code: 'unauthorized' });
      }
      return next();
    })(req, res, next);
  }
}

export default AuthenticationController;
