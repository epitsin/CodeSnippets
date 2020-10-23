import bodyParser from 'body-parser';
import express from 'express';
import { Server } from 'http';

import CORS from '../middlewares/cors';
import Http from '../middlewares/http';
import Locals from './locals';
import Router from './routes/router';

class Express {
  public express: express.Application;

  constructor() {
    this.express = express();
  }

  /**
   * Initialize express and its middlewares
   */
  public init(): any {
    this.express.use(bodyParser.json());

    this.mountDotEnv();
    this.mountMiddlewares();
    this.mountRoutes();
  }

  /**
   * Start the express server
   */
  public start(): Server {
    const { port } = Locals.config();

    // Start the server on the specified port
    return this.express.listen(port, () => console.log(`Server listening on 'http://localhost:${port}'`));
  }

  private mountDotEnv(): void {
    this.express = Locals.init(this.express);
  }

  /**
   * Mount all the defined middlewares
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
   * Mount all the defined routes
   */
  private mountRoutes(): void {
    this.express = Router.mountApi(this.express);
  }
}

export default new Express();
