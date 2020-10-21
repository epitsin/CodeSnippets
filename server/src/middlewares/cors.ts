import cors from 'cors';
import { Application } from 'express';

import Locals from '../providers/locals';

class CORS {
  public static mount(express: Application): Application {
    const options = {
      origin: Locals.config().url,
    };

    express.use(cors(options));

    return express;
  }
}

export default CORS;
