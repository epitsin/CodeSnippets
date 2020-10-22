import { Request, Response } from 'express';

import { TagModel } from '../models/tag';
import TagRepository from '../repositories/tagRepository';

class TagController {
  private tagRepository: TagRepository;

  constructor(tagRepository: TagRepository) {
    this.tagRepository = tagRepository;
  }

  public async getAll(_req: Request, res: Response) {
    const tags = await this.tagRepository
      .getMany()
      .catch((err) => res.status(500).send(err));

    return res.json(tags);
  }

  public async post(req: Request, res: Response) {
    const tag = req.body as TagModel;
    const createdTag = await this.tagRepository
      .create(tag)
      .catch((err) => res.status(500).send(err));

    return res.status(201).json(createdTag);
  }
}

export default TagController;
