import express from 'express';
import AuthenticationController from '../controllers/authenticationController';
import TagController from '../controllers/tagController';
import TagRepository from '../repositories/tagRepository';

class TagsRouter {
  private tagController: TagController;

  constructor() {
    this.tagController = new TagController(new TagRepository()); // TODO: inject?
  }

  get routes(): express.Router {
    const router = express.Router();
    router.get('/', this.tagController.getAll.bind(this.tagController));
    router.get('/reports/snippets', this.tagController.getSnippetsReport.bind(this.tagController));
    router.get('/reports/likes', this.tagController.getLikesReport.bind(this.tagController));
    router.post('/', AuthenticationController.authenticateJWT, this.tagController.post.bind(this.tagController));

    return router;
  }
}

export default TagsRouter;
