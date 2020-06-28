import { request } from '../axios.config';
import { Article } from '@/client/types/article.interface';
import { ListResponse } from '@/client/types/response/list.response';
import { User } from '@/client/types/user.interface';
import { NumberString } from '@/client/types/NumberString.interface';

export const user = {
  createArticle(data: {
    title: string;
    content: string;
    summary: string;
    picture: string;
    category_id: number;
    tags: number[];
    secret: number;
  }): Promise<Article> {
    return request.post('/article/user/create-article', data);
  },
  updateArticle(data: Partial<Omit<Article, 'content'> & { content: string; }> & { article_id: number; }): Promise<Article> {
    return request.post('/article/user/update-article', data);
  },
  deleteArticle(articleId: number) {
    return request.get('/article/user/delete', {
      params: {
        article_id: articleId,
      },
    });
  },
  getArticle(data: {
    title?: string;
    article_id?: NumberString;
  }): Promise<Article> {
    return request.get('/article/user/detail', {
      params: data,
    });
  },
  getList(params: {
    page: NumberString,
    size: number,
    category_id?: NumberString,
    tag_id?: NumberString,
    order?: string,
    title?: string,
  }): Promise<ListResponse<User>> {
    return request.get('/article/user/list', {
      params
    });
  },
  search(
    title: string,
    page: number,
    size: number,
  ): Promise<ListResponse<User>> {
    return request.get('/article/user/search', {
      params: {
        page,
        size,
        title,
      },
    });
  }
};
