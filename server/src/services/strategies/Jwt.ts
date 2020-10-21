import { PassportStatic } from 'passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import UserSchema from '../../models/user';
import Locals from '../../providers/locals';

class Jwt {
  public static init(passport: PassportStatic): void {
    const options = {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: Locals.config().appSecret,
    };

    passport.use('JWT', new Strategy(options, (jwtPayload, done) => {
      debugger;
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
  }
}

export default Jwt;
