import { Request, Response } from 'express';

import TagRepository from '../repositories/tagRepository';

class ReportController {
  private tagRepository: TagRepository;

  constructor(tagRepository: TagRepository) {
    this.tagRepository = tagRepository;
  }

  public async getSnippetsReport(_req: Request, res: Response) {
    const tags = await this.tagRepository
      .getSnippetsReport()
      .catch((err) => res.status(500).send(err));

    return res.json(tags);
  }

  public async getLikesReport(_req: Request, res: Response) {
    const tags = await this.tagRepository
      .getLikesReport()
      .catch((err) => res.status(500).send(err));

    return res.json(tags);
  }
}

export default ReportController;
