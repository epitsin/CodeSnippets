import bodyParser from 'body-parser';
import compress from 'compression';
import { Application } from 'express';

import Passport from '../providers/passport';

class Http {
  public static mount(express: Application): Application {
    // Enables the request body parser
    express = express.use(bodyParser.json());

    // Enables the "gzip" / "deflate" compression for response data
    express = express.use(compress());

    // Loads the passport configuration
    express = Passport.mountPackage(express);

    return express;
  }
}

export default Http;
