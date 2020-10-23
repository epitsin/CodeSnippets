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
    const appSecret = process.env.APP_SECRET || 'This is your responsibility!';
    const mongooseUrl = process.env.MONGO_URL;
    const maxUploadLimit = process.env.APP_MAX_UPLOAD_LIMIT || '50mb';
    const maxParameterLimit = process.env.APP_MAX_PARAMETER_LIMIT || '50mb';

    const isCORSEnabled = process.env.CORS_ENABLED || true;
    const jwtExpiresIn = process.env.JWT_EXPIRES_IN || 30;
    const apiPrefix = process.env.API_PREFIX || 'api';

    return {
      appSecret,
      apiPrefix,
      isCORSEnabled,
      jwtExpiresIn,
      maxUploadLimit,
      maxParameterLimit,
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
