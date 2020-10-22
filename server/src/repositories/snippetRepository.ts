import { SnippetDto } from '../interfaces/dtos/snippetDto';
import SnippetSchema, { SnippetModel } from '../models/snippet';
import Repository from './repository';
import TagRepository from './tagRepository';

class SnippetRepository extends Repository<SnippetModel> {
  // eslint-disable-next-line no-unused-vars
  constructor(private tagRepository: TagRepository) {
    super(SnippetSchema);
  }

  public getByIdWithTags(id: string) {
    return this.model.findById(id)
      .populate('tags', 'name')
      .populate('likes', '_id')
      .populate('author', '_id firstName lastName')
      .exec();
  }

  public async create(dto: SnippetDto) {
    // eslint-disable-next-line new-cap
    const document = new this.model({ name: dto.name, code: dto.code, author: dto.author });
    const snippet = await document.save();
    dto.tags.forEach(async (tagDto) => {
      let tag = await this.tagRepository.getOne({ name: tagDto.name });
      tag = tag ?? await this.tagRepository.create(tagDto);

      snippet.tags.push(tag._id);
      await snippet.save();

      tag.snippets.push(snippet._id);
      await tag.save();
    });

    return snippet;
  }

  public async like(snippetId: string, userId: string) {
    return this.model.findByIdAndUpdate(
      snippetId,
      { $push: { likes: userId } },
      { new: true },
    ).exec();
  }
}

export default SnippetRepository;
