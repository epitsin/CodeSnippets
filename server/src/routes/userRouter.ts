import express from 'express';
import UserController from '../controllers/userController';
import UserRepository from '../repositories/userRepository';

class UserRouter {
  private controller: UserController;

  constructor() {
    this.controller = new UserController(new UserRepository()); // TODO: inject?
  }

  get routes(): express.Router {
    const router = express.Router();
    router.get('/', this.controller.get.bind(this.controller));
    router.post('/login', this.controller.login.bind(this.controller));
    router.post('/register', this.controller.register.bind(this.controller));

    return router;
  }
}

export default UserRouter;
