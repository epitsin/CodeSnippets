import express from 'express';
import AuthenticationController from '../controllers/authenticationController';
import SnippetController from '../controllers/snippetController';
import SnippetRepository from '../repositories/snippetRepository';
import TagRepository from '../repositories/tagRepository';

class SnippetsRouter {
  private snippetController: SnippetController;

  constructor() {
    this.snippetController = new SnippetController(new SnippetRepository(new TagRepository()));
  }

  get routes(): express.Router {
    const router = express.Router();
    router.get('/', this.snippetController.getAll.bind(this.snippetController));
    router.get('/mine', AuthenticationController.authenticateJWT, this.snippetController.getMine.bind(this.snippetController));
    router.get('/:id', AuthenticationController.authenticateJWT, this.snippetController.getById.bind(this.snippetController));

    router.post('/', AuthenticationController.authenticateJWT, this.snippetController.post.bind(this.snippetController));
    router.post('/like', AuthenticationController.authenticateJWT, this.snippetController.like.bind(this.snippetController));

    router.delete('/:id', AuthenticationController.authenticateJWT, this.snippetController.delete.bind(this.snippetController));

    return router;
  }
}

export default SnippetsRouter;
