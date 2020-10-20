import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import DataInitializer from './utils/dataInitializer';
import SnippetsRouter from './routes/snippetsRouter';
import Router from './routes/router';
import config from './config';

class App {
  public app: express.Application;

  public snippetsRouter: SnippetsRouter = new SnippetsRouter();

  constructor() {
    dotenv.config();

    this.app = express();
    App.mongoDb();
    this.config();
  }

  private static mongoDb(): void {
    const run = async () => {
      mongoose.connect(config.databaseURL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
      });

      await DataInitializer.populateInitialData();
    };
    run().catch((err) => console.log(err));
  }

  private config(): void {
    // read JSON post data from the request body
    this.app.use(bodyParser.json());

    this.app.use(cookieParser());

    // this.app.use((_req, res, next) => { // TODO: fix
    //   res.header('Access-Control-Allow-Origin', '*');
    //   res.header('Access-Control-Allow-Headers',
    // 'Origin, X-Requested-With, Content-Type, Accept');
    //   next();
    // });

    this.app.use(cors());

    this.app.use(Router.routes);
  }
}

export default new App().app;
