import { Tag } from './tag';
import { User } from './user';

export interface Snippet {
  _id?: string;
  name?: string;
  code?: string;
  author?: User;
  tags?: string[];
  likes?: string[]
}
