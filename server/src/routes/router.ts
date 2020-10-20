import express from 'express';
import SnippetsRouter from './snippetsRouter';
import UserRouter from './userRouter';

class Router {
  public static get routes() {
    const app = express();
    app.use('/api/snippets', new SnippetsRouter().routes);
    app.use('/api/users', new UserRouter().routes);
    return app;
  }
}

export default Router;
