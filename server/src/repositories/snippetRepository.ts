import { SnippetDto } from '../interfaces/dtos/snippetDto';
import { TagDto } from '../interfaces/dtos/tagDto';
import SnippetSchema, { SnippetModel } from '../models/snippet';
import Repository from './repository';
import TagRepository from './tagRepository';

class SnippetRepository extends Repository<SnippetModel> {
  constructor(private tagRepository: TagRepository) {
    super(SnippetSchema);
  }

  public getByIdWithAuthor(id: string) {
    return this.model.findById(id)
      .populate('author', '_id firstName lastName')
      .exec();
  }

  public async create(dto: SnippetDto) {
    const snippetTags = dto.tags.map((item) => item.toString().toLowerCase());
    const uniqueTags = [...new Set(snippetTags)]; // Set allows only unique values

    const document = new this.model({
      name: dto.name,
      code: dto.code,
      author: dto.author,
      tags: uniqueTags,
    });
    const snippet = await document.save();

    // eslint-disable-next-line no-restricted-syntax
    for await (const tag of dto.tags) {
      // TODO: Use findOneAndUpdate(upsert:true)
      // Find case insensitive (just in case)
      const result = await this.tagRepository.getOne({ name: { $regex: new RegExp(tag, 'i') } });
      if (!result) {
        const tagDto: TagDto = {
          name: tag,
          snippets: [snippet._id],
        };
        return this.tagRepository.create(tagDto);
      }

      result.snippets.push(snippet._id);
      return result.save();
    }

    return snippet;
  }

  public async like(snippetId: string, userId: string) {
    return this.model.findByIdAndUpdate(
      snippetId,
      { $push: { likes: userId } },
      { new: true },
    ).exec();
  }

  public async dislike(snippetId: string, userId: string) {
    return this.model.findByIdAndUpdate(
      snippetId,
      { $pullAll: { likes: [userId] } },
      { new: true },
    ).exec();
  }
}

export default SnippetRepository;
