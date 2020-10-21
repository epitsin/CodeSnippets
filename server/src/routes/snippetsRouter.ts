import express from 'express';
import AuthenticationController from '../controllers/authenticationController';
import SnippetController from '../controllers/snippetController';
import SnippetRepository from '../repositories/snippetRepository';

class SnippetsRouter {
  private snippetController: SnippetController;

  constructor() {
    this.snippetController = new SnippetController(new SnippetRepository()); // TODO: inject?
  }

  get routes(): express.Router {
    const router = express.Router();
    router.get('/', this.snippetController.getAll.bind(this.snippetController));
    router.post('/', AuthenticationController.authenticateJWT, this.snippetController.post.bind(this.snippetController));

    router.get('/:id', AuthenticationController.authenticateJWT, this.snippetController.getById.bind(this.snippetController));

    return router;
  }
}

export default SnippetsRouter;
