import express from 'express';

import SnippetController from '../../controllers/snippetController';
import Auth from '../../middlewares/auth';
import SnippetRepository from '../../repositories/snippetRepository';
import TagRepository from '../../repositories/tagRepository';
import Validator from '../../middlewares/validator';

class SnippetRouter {
  private snippetController: SnippetController;

  constructor() {
    this.snippetController = new SnippetController(new SnippetRepository(new TagRepository()));
  }

  public get routes(): express.Router {
    const router = express.Router();
    router.get('/', this.snippetController.getAll.bind(this.snippetController));
    router.get('/mine', Auth.authenticateJWT, this.snippetController.getMine.bind(this.snippetController));
    router.get('/:id', this.snippetController.getById.bind(this.snippetController));

    router.post('/', Validator.validateSnippet, Auth.authenticateJWT, this.snippetController.create.bind(this.snippetController));
    router.post('/:id/likes', Auth.authenticateJWT, this.snippetController.like.bind(this.snippetController));
    router.delete('/:id/likes', Auth.authenticateJWT, this.snippetController.dislike.bind(this.snippetController));

    router.delete('/:id', Auth.authenticateJWT, this.snippetController.delete.bind(this.snippetController));

    return router;
  }
}

export default SnippetRouter;
