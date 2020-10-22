import * as express from 'express';
import { SnippetDto } from '../interfaces/dtos/snippetDto';
import SnippetRepository from '../repositories/snippetRepository';

class SnippetController {
  private snippetRepository: SnippetRepository;

  constructor(snippetRepository: SnippetRepository) {
    this.snippetRepository = snippetRepository;
  }

  public async getAll(_req: express.Request, res: express.Response) {
    // const { page, limit } = req.query;

    // .paginate({ page, limit }).exec();
    const snippets = await this.snippetRepository.get().catch((err) => res.send(err));
    return res.json(snippets);
  }

  public async getMine(req: express.Request, res: express.Response) {
    const query = { author: req.query.userId };
    const snippets = await this.snippetRepository.get(query)
      .catch((err) => res.send(err));
    return res.json(snippets);
  }

  // eslint-disable-next-line class-methods-use-this
  public async getById(req: express.Request, res: express.Response) {
    try {
      const snippet = await this.snippetRepository.getByIdWithTags(<string>req.params.id);
      console.log(snippet);
      if (snippet) {
        return res.json(snippet);
      }

      return res.sendStatus(404);
    } catch (err) {
      return res.send(err);
    }
  }

  public async post(req: express.Request, res: express.Response) {
    const snippet = req.body as SnippetDto;
    snippet.author = req.authenticatedUser;
    try {
      const createdSnippet = await this.snippetRepository.create(snippet);

      return res.status(201).json(createdSnippet);
    } catch (err) {
      return res.send(err);
    }
  }

  public async like(req: express.Request, res: express.Response) {
    const snippet = req.body as SnippetDto;
    try {
      const updatedSnippet = await this.snippetRepository.like(
        snippet._id,
        req.authenticatedUser._id,
      );

      return res.json(updatedSnippet);
    } catch (err) {
      return res.send(err);
    }
  }
}

export default SnippetController;
