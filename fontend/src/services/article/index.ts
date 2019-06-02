import User from './user';
import Visitor from './visitor';

export interface CreateArticle {
  title: string;
  content: string;
  summary: string;
  picture: string;
  category_id: number;
  tags: number[];
  secret: number;
}

export interface UpdateArticle {
  article_id: number;
  title?: string;
  content?: string;
  summary?: string;
  picture?: string;
  category_id?: number;
  tags?: number[];
  secret?: number;
  level?: number;
}

export interface GetArticle {
  user_id: number;
  title?: string;
  article_id?: number;
}

export const ArticleService = {
  user: User,
  visitor: Visitor,
};
