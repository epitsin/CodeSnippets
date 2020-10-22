import * as express from 'express';
import { TagModel } from '../models/tag';
import TagRepository from '../repositories/tagRepository';

class TagController {
  private tagRepository: TagRepository;

  constructor(tagRepository: TagRepository) {
    this.tagRepository = tagRepository;
  }

  public async getAll(_req: express.Request, res: express.Response) {
    const tags = await this.tagRepository.get().catch((err) => res.send(err));
    return res.json(tags);
  }

  public async post(req: express.Request, res: express.Response) {
    const tag = req.body as TagModel;
    try {
      const existingTag = await this.tagRepository.getById(<string>req.params.id);
      if (existingTag) {
        const createdTag = await this.tagRepository
          .create(tag)
          .catch((err) => res.send(err));
        return res.status(201).json(createdTag);
      }

      return res.sendStatus(404);
    } catch (err) {
      return res.send(err);
    }
  }

  public async getSnippetsReport(_req: express.Request, res: express.Response) {
    try {
      const tags = await this.tagRepository.getSnippetsReport();
      return res.json(tags);
    } catch (err) {
      console.log(err);
      return res.send(err);
    }
  }

  public async getLikesReport(_req: express.Request, res: express.Response) {
    try {
      const tags = await this.tagRepository.getLikesReport();
      return res.json(tags);
    } catch (err) {
      console.log(err);
      return res.send(err);
    }
  }
}

export default TagController;
