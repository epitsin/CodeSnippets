import express from "express";
import bodyParser from "body-parser";
import mongoose from 'mongoose';
import { DataInitializer } from './utils/dataInitializer';
import { SnippetsRouter } from './routes/snippetsRouter';
import { environment } from './config/environment/dev';
import { Router } from "./routes/router";

class App {
  public app: express.Application;
  public snippetsRouter: SnippetsRouter = new SnippetsRouter();

  constructor() {
    this.app = express();
    this.configureDatabase();
    this.configureExpress();
    //this.snippetsRouter.configureRoutes(this.app);
  }

  private async configureDatabase(): Promise<void> {
    await mongoose.connect(environment.mongoURL, { useNewUrlParser: true });

    await DataInitializer.populateInitialData();
  }

  private configureExpress(): void {
    // support application/json type post data
    this.app.use(bodyParser.json());
    //support application/x-www-form-urlencoded post data
    this.app.use(bodyParser.urlencoded({ extended: false }));

    this.app.use(new Router().routes);
  }

}

export default new App().app;