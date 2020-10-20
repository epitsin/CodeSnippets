import * as express from 'express';
import { SnippetController } from '../controllers/snippetController';
import { SnippetRepository } from '../repositories/snippetRepository';

export class SnippetsRouter {
  private controller: SnippetController;

  constructor() {
    this.controller = new SnippetController(new SnippetRepository); // TODO: inject?
  }

  get routes(): express.Router {
    const router = express.Router();
    router.get("/snippets", this.controller.get.bind(this.controller));
    router.post("/snippets", this.controller.post.bind(this.controller));

    router.use('/snippets/:id', this.controller.validateSnippet.bind(this.controller)); 
    router.get("/snippets/:id", this.controller.getById.bind(this.controller));

    return router;
  }
}
