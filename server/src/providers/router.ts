import { Application } from 'express';

import Locals from './locals';
import SnippetsRouter from '../routes/snippetsRouter';
import UserRouter from '../routes/userRouter';
import TagsRouter from '../routes/tagRouter';

class Router {
  public static mountApi(express: Application): Application {
    const { apiPrefix } = Locals.config();
    express.use(`/${apiPrefix}/snippets`, new SnippetsRouter().routes);
    express.use(`/${apiPrefix}/tags`, new TagsRouter().routes);
    express.use(`/${apiPrefix}/users`, new UserRouter().routes);

    return express;
  }
}

export default Router;
