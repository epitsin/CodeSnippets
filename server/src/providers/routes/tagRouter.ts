import express from 'express';

import TagController from '../../controllers/tagController';
import Auth from '../../middlewares/auth';
import TagRepository from '../../repositories/tagRepository';

class TagsRouter {
  private tagController: TagController;

  constructor() {
    this.tagController = new TagController(new TagRepository());
  }

  public get routes(): express.Router {
    const router = express.Router();
    router.get('/', this.tagController.getAll.bind(this.tagController));
    router.post('/', Auth.authenticateJWT, this.tagController.post.bind(this.tagController));

    return router;
  }
}

export default TagsRouter;
