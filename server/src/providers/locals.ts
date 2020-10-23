import dotenv from 'dotenv';
import { Application } from 'express';
import path from 'path';

class Locals {
  /**
   * Makes env configs available for the app
   * throughout its runtime
   */
  public static config(): any {
    dotenv.config({ path: path.join(__dirname, '../../.env') });

    const url = process.env.APP_URL || `http://localhost:${process.env.PORT}`;
    const port = process.env.PORT || 3000;
    const appSecret = process.env.APP_SECRET || 'secret';
    const mongooseUrl = process.env.MONGO_URL;

    const isCORSEnabled = process.env.CORS_ENABLED || true;
    const jwtExpiresIn = process.env.JWT_EXPIRES_IN || 30;
    const apiPrefix = process.env.API_PREFIX || 'api';

    return {
      appSecret,
      apiPrefix,
      isCORSEnabled,
      jwtExpiresIn,
      mongooseUrl,
      port,
      url,
    };
  }

  /**
   * Injects the config to the app's locals
   */
  public static init(express: Application): Application {
    express.locals.app = this.config();
    return express;
  }
}

export default Locals;
