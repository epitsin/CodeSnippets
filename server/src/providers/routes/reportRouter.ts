import express from 'express';

import ReportController from '../../controllers/reportController';
import Auth from '../../middlewares/auth';
import TagRepository from '../../repositories/tagRepository';

class ReportRouter {
  private reportController: ReportController;

  constructor() {
    this.reportController = new ReportController(new TagRepository());
  }

  public get routes(): express.Router {
    const router = express.Router();
    router.get('/tags-by-snippets', Auth.authorizeJWT, this.reportController.getSnippetsReport.bind(this.reportController));
    router.get('/tags-by-likes', Auth.authorizeJWT, this.reportController.getLikesReport.bind(this.reportController));

    return router;
  }
}

export default ReportRouter;
