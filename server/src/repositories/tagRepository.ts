import { TagDto } from '../interfaces/dtos/tagDto';
import TagSchema, { TagModel } from '../models/tag';
import Repository from './repository';

class TagRepository extends Repository<TagModel> {
  constructor() {
    super(TagSchema);
  }

  public getByIdWithSnippets(id: string) {
    return this.model.findById(id).populate('snippets', 'name').exec();
  }

  public async create(dto: TagDto) {
    // eslint-disable-next-line new-cap
    const document = new this.model(dto);

    return document.save();
  }
}

export default TagRepository;
