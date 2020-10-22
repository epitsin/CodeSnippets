import express from 'express';

import UserController from '../../controllers/userController';
import Auth from '../../middlewares/auth';
import UserRepository from '../../repositories/userRepository';

class UserRouter {
  private controller: UserController;

  constructor() {
    this.controller = new UserController(new UserRepository()); // TODO: inject?
  }

  public get routes(): express.Router {
    const router = express.Router();
    router.get('/', Auth.authenticateJWT, this.controller.get.bind(this.controller));

    return router;
  }
}

export default UserRouter;
