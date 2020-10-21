import SnippetSchema, { ISnippet } from '../models/snippet';
import Repository from './repository';

class SnippetRepository extends Repository<ISnippet> {
  constructor() {
    super(SnippetSchema);
  }

  public getByIdWithTags(id: string) {
    return this.model.findById(id).populate('tags', 'name').exec();
  }
}

export default SnippetRepository;
