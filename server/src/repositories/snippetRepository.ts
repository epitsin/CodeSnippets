import SnippetSchema, { ISnippet } from '../models/snippet';
import { Repository } from './repository';

export class SnippetRepository extends Repository<ISnippet> {
  constructor() {
    super(SnippetSchema);
  }
}
