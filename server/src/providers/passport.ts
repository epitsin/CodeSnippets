import {
  Application,
  NextFunction,
  Request,
  Response,
} from 'express';
import passport from 'passport';

import { ExtractJwt, Strategy } from 'passport-jwt';
import Jwt from '../services/strategies/Jwt';
import UserSchema from '../models/user';
import Locals from './locals';

class Passport {
  public static mountPackage(express: Application): Application {
    express.use(passport.initialize());
    express.use(passport.session());

    passport.serializeUser<any, any>((user, done) => {
      done(null, user.id);
    });

    passport.deserializeUser<any, any>((id, done) => {
      UserSchema.findById(id, (err, user) => {
        done(err, user);
      });
    });

    // Passport.mountJwtStrategy();
    const options = {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: Locals.config().appSecret,
    };
    passport.use('JWT', new Strategy(options, (jwtPayload, done) => {
      // email or sub?
      UserSchema.findOne({ email: jwtPayload.email }, (err, user) => {
        if (err) {
          return done(err, false);
        }

        if (!user) {
          return done(null, false, { msg: `E-mail ${jwtPayload.email} not found.` });
        }

        if (user && !user.password) {
          return done(null, false, { msg: `E-mail ${jwtPayload.email} was not registered with us using any password. Please use the appropriate providers to Log-In again!` });
        }

        return done(null, user);
      });
    }));

    return express;
  }

  public static mountJwtStrategy(): void {
    try {
      Jwt.init(passport);
      console.log(passport.Strategy);
    } catch (err) {
      console.log(err);
    }
  }

  public static isAuthenticated(req: Request, res: Response, next: NextFunction): any {
    if (req.isAuthenticated()) {
      return next();
    }

    req.flash('errors', 'Please Log-In to access any further!');
    return res.redirect('/login');
  }
}

export default Passport;
