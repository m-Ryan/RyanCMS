import { Category } from '../../interface/category.interface';
import Visitor from '../article/visitor';
import User from './user';

export interface CategoryResponse {
  list: Category[];
  count: number;
}

export const CategoryService = {
  user: User,
  visitor: Visitor,
};
