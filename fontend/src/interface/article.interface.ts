import { Tag } from './tag.interface';
import { Category } from './category.interface';
import { User } from './user.interface';

interface content {
  article_id: number;
  content: string;
}

export interface Article {
  article_id: number;
  writer_id: number;
  category_id: number;
  picture: string;
  writer: User;
  title: string;
  summary: string;
  secret: number;
  readcount: number;
  updated_at: number;
  created_at: number;
  level: number;
  content: content;
  tags: Tag[];
  category: Category;
}
