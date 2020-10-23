import { UserDto } from './userDto';

export interface SnippetDto {
  name: string;
  code: string;
  author?: UserDto;
  tags: string[];
}
