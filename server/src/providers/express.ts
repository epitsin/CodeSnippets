import bodyParser from 'body-parser';
import express from 'express';

import CORS from '../middlewares/cors';
import Http from '../middlewares/http';
import Locals from './locals';
import Router from './router';

class Express {
  /**
   * Create the express object
   */
  public express: express.Application;

  /**
   * Initializes the express server
   */
  constructor() {
    this.express = express();

    this.express.use(bodyParser.json());

    this.mountDotEnv();
    this.mountMiddlewares();
    this.mountRoutes();
  }

  private mountDotEnv(): void {
    this.express = Locals.init(this.express);
  }

  /**
   * Mounts all the defined middlewares
   */
  private mountMiddlewares(): void {
    // Check if CORS is enabled
    if (Locals.config().isCORSEnabled) {
      // Mount CORS middleware
      this.express = CORS.mount(this.express);
    }

    // Mount basic express apis middleware
    this.express = Http.mount(this.express);
  }

  /**
   * Mounts all the defined routes
   */
  private mountRoutes(): void {
    this.express = Router.mountApi(this.express);
  }

  /**
   * Starts the express server
   */
  public init(): any {
    const { port } = Locals.config();

    // Start the server on the specified port
    this.express.listen(port, () => console.log(`Server listening on 'http://localhost:${port}'`));
  }
}

export default new Express();
