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

  public async getSnippetsReport() {
    const result = await this.model.aggregate([{
      // Join with snippets collection
      $lookup: {
        from: 'snippets',
        localField: 'snippets',
        foreignField: '_id',
        as: 'tag_snippets',
      },
    }, {
      $project: {
        _id: 1,
        name: 1,
        count: {
          // Get snippets.length or 0 in case likes is missing
          $size: { $ifNull: ['$snippets', []] },
        },
        size: {
          // Calculate the sum of all likes of all snippets
          $sum: {
            $map: {
              input: '$tag_snippets',
              // Get snippets.likes.length or 0 in case likes is missing
              in: { $size: { $ifNull: ['$$this.likes', []] } },
            },
          },
        },
      },
    },
    ]).exec();

    return result;
  }

  public async getLikesReport() {
    const result = this.model.aggregate([{
      // Join with snippets collection
      $lookup: {
        from: 'snippets',
        localField: 'snippets',
        foreignField: '_id',
        as: 'tag_snippets',
      },
    }, {
      $project: {
        _id: 1,
        name: 1,
        count: {
          // Calculate the sum of all likes of all snippets
          $sum: {
            $map: {
              input: '$tag_snippets',
              // Get snippets.likes.length or 0 in case likes is missing
              in: { $size: { $ifNull: ['$$this.likes', []] } },
            },
          },
        },
        size: {
          // Get snippets.length or 0 in case likes is missing
          $size: { $ifNull: ['$snippets', []] },
        },
      },
    },
    ]).exec();

    return result;
  }
}

export default TagRepository;
