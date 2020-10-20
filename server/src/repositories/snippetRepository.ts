import SnippetSchema, { ISnippet } from '../models/snippet';
import Repository from './repository';

class SnippetRepository extends Repository<ISnippet> {
  constructor() {
    super(SnippetSchema);
  }
}

export default SnippetRepository;
