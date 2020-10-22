import express from 'express';

import AuthenticationController from '../../controllers/authenticationController';
import Validator from '../../middlewares/validator';
import UserRepository from '../../repositories/userRepository';

class AuthenticationRouter {
  private controller: AuthenticationController;

  constructor() {
    this.controller = new AuthenticationController(new UserRepository()); // TODO: inject?
  }

  public get routes(): express.Router {
    const router = express.Router();
    router.post('/login', Validator.validateLoginUser, this.controller.login.bind(this.controller));
    router.post('/register', Validator.validateRegisterUser, this.controller.register.bind(this.controller));

    // TODO:
    // router.post('/forgot-password', this.controller.register.bind(this.controller));
    // router.post('/reset-password', this.controller.register.bind(this.controller));

    return router;
  }
}

export default AuthenticationRouter;
