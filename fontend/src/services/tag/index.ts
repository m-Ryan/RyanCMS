import { Tag } from '../../interface/tag.interface';
import User from './user';
import Visitor from './visitor';

export interface TagResponse {
  list: Tag[];
  count: number;
}

export const TagService = {
  user: User,
  visitor: Visitor,
};
