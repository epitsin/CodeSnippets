import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compress from 'compression';
import { Application } from 'express';
import flash from 'express-flash';

import Locals from '../providers/locals';
import Passport from '../providers/passport';

class Http {
  public static mount(express: Application): Application {
    // Enables the request body parser
    express.use(bodyParser.json({
      limit: Locals.config().maxUploadLimit,
    }));

    express.use(bodyParser.urlencoded({
      limit: Locals.config().maxUploadLimit,
      parameterLimit: Locals.config().maxParameterLimit,
      extended: false,
    }));

    express.use(cookieParser());

    // Enables the request flash messages
    express.use(flash());

    // Enables the "gzip" / "deflate" compression for response
    express.use(compress());

    // Loads the passport configuration
    express = Passport.mountPackage(express);

    return express;
  }
}

export default Http;
