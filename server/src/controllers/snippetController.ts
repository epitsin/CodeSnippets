import * as express from 'express';
import { ISnippet } from '../models/snippet';
import SnippetRepository from '../repositories/snippetRepository';

class SnippetController {
  private snippetRepository: SnippetRepository;

  constructor(snippetRepository: SnippetRepository) {
    this.snippetRepository = snippetRepository;
  }

  public async get(_req: express.Request, res: express.Response) {
    const snippets = await this.snippetRepository.get().catch((err) => res.send(err));
    return res.json(snippets);
  }

  // eslint-disable-next-line class-methods-use-this
  public async getById(req: express.Request, res: express.Response) {
    return res.json(req.snippet);
  }

  public async validateSnippet(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) {
    let snippet;
    try {
      snippet = await this.snippetRepository.getById(<string>req.params.id);
    } catch (err) {
      return res.send(err);
    }

    if (snippet) {
      req.snippet = snippet;
      return next();
    }

    return res.sendStatus(404);
  }

  public async post(req: express.Request, res: express.Response) {
    const snippet = req.body as ISnippet;
    const createdSnippet = await this.snippetRepository
      .create(snippet)
      .catch((err) => res.send(err));
    return res.status(201).json(createdSnippet);
  }
}

export default SnippetController;
