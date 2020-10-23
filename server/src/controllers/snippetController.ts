import { Request, Response } from 'express';

import { SnippetDto } from '../interfaces/dtos/snippetDto';
import SnippetRepository from '../repositories/snippetRepository';

class SnippetController {
  private snippetRepository: SnippetRepository;

  constructor(snippetRepository: SnippetRepository) {
    this.snippetRepository = snippetRepository;
  }

  public async getAll(_req: Request, res: Response) {
    // const { page, limit } = req.query;

    // .paginate({ page, limit }).exec();
    const snippets = await this.snippetRepository
      .getMany()
      .catch((err) => res.status(500).send(err));

    return res.json(snippets);
  }

  public async getMine(req: Request, res: Response) {
    const snippets = await this.snippetRepository
      .getMany({ author: req.authenticatedUser._id })
      .catch((err) => res.status(500).send(err));

    return res.json(snippets);
  }

  public async getById(req: Request, res: Response) {
    const snippet = await this.snippetRepository
      .getByIdWithTags(<string>req.params.id)
      .catch((err) => res.status(500).send(err));
    if (!snippet) {
      return res.sendStatus(404);
    }

    return res.json(snippet);
  }

  public async create(req: Request, res: Response) {
    const snippet = req.body as SnippetDto;
    snippet.author = req.authenticatedUser;

    const existingSnippet = await this.snippetRepository.getOne({ name: { $regex: new RegExp(snippet.name, 'i') } });
    if (existingSnippet) {
      return res.status(400).json({ error: 'Snippet with this name already exists!' });
    }

    const createdSnippet = await this.snippetRepository
      .create(snippet)
      .catch((err) => res.status(500).send(err));

    return res.status(201).json(createdSnippet);
  }

  public async like(req: Request, res: Response) {
    const updatedSnippet = await this.snippetRepository
      .like(<string>req.params.id, req.authenticatedUser._id)
      .catch((err) => res.status(500).send(err));

    return res.json(updatedSnippet);
  }

  public async dislike(req: Request, res: Response) {
    const updatedSnippet = await this.snippetRepository
      .dislike(<string>req.params.id, req.authenticatedUser._id)
      .catch((err) => res.status(500).send(err));

    return res.json(updatedSnippet);
  }

  public async delete(req: Request, res: Response) {
    await this.snippetRepository.delete(<string>req.params.id)
      .catch((err) => res.status(500).send(err));

    return res.sendStatus(204);
  }
}

export default SnippetController;
