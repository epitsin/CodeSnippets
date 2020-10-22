import { TagDto } from './tagDto';
import { UserDto } from './userDto';

export interface SnippetDto {
  _id: string;
  name: string;
  code: string;
  author: UserDto;
  tags: TagDto[];
}
