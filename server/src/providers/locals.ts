import dotenv from 'dotenv';
import { Application } from 'express';
import path from 'path';

class Locals {
  /**
   * Makes env configs available for your app
   * throughout the app's runtime
   */
  public static config(): any {
    dotenv.config({ path: path.join(__dirname, '../../.env') });

    const url = process.env.APP_URL || `http://localhost:${process.env.PORT}`;
    const port = process.env.PORT || 4040;
    const appSecret = process.env.APP_SECRET || 'This is your responsibility!';
    const mongooseUrl = process.env.MONGOOSE_URL;
    const maxUploadLimit = process.env.APP_MAX_UPLOAD_LIMIT || '50mb';
    const maxParameterLimit = process.env.APP_MAX_PARAMETER_LIMIT || '50mb';

    const name = process.env.APP_NAME || 'NodeTS Dashboard';
    const keywords = process.env.APP_KEYWORDS || 'somethings';
    const year = (new Date()).getFullYear();
    const copyright = `Copyright ${year} ${name} | All Rights Reserved`;
    const company = process.env.COMPANY_NAME || 'GeekyAnts';
    const description = process.env.APP_DESCRIPTION || 'Here goes the app description';

    const isCORSEnabled = process.env.CORS_ENABLED || true;
    const jwtExpiresIn = process.env.JWT_EXPIRES_IN || 3;
    const apiPrefix = process.env.API_PREFIX || 'api';

    return {
      appSecret,
      apiPrefix,
      company,
      copyright,
      description,
      isCORSEnabled,
      jwtExpiresIn,
      keywords,
      maxUploadLimit,
      maxParameterLimit,
      mongooseUrl,
      name,
      port,
      url,
    };
  }

  /**
   * Injects your config to the app's locals
   */
  public static init(express: Application): Application {
    // eslint-disable-next-line no-param-reassign
    express.locals.app = this.config();
    return express;
  }
}

export default Locals;
