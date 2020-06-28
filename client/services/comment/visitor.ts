import { request } from '../axios.config';
import { Comment } from '@/client/types/comment.interface';
import { ListResponse } from '@/client/types/response/list.response';

export const visitor = {
  getComment(data: {
    blogger_id?: number;
    article_id?: number;
  }): Promise<Comment> {
    return request.get('/message/visitor/info', {
      params: data,
    });
  },

  getList(
    page: number,
    size: number = 10,
    commentId: number,
  ): Promise<ListResponse<Comment>> {
    return request.get('/message/visitor/list', {
      params: {
        page,
        size,
        comment_id: commentId,
      },
    });
  }
}
