import { Application } from 'express';

import Locals from '../locals';
import SnippetRouter from './snippetRouter';
import UserRouter from './userRouter';
import TagsRouter from './tagRouter';
import ReportRouter from './reportRouter';
import AuthenticationRouter from './authenticationRouter';

class Router {
  public static mountApi(express: Application): Application {
    const { apiPrefix } = Locals.config();
    express.use(`/${apiPrefix}/snippets`, new SnippetRouter().routes);
    express.use(`/${apiPrefix}/tags`, new TagsRouter().routes);
    express.use(`/${apiPrefix}/reports`, new ReportRouter().routes);
    express.use(`/${apiPrefix}/users`, new UserRouter().routes);
    express.use(`/${apiPrefix}/auth`, new AuthenticationRouter().routes);

    return express;
  }
}

export default Router;
