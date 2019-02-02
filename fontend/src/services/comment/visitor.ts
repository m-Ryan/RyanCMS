import { API } from './../API';
import { CommentResponse } from '.';
import { Comment } from '../../interface/comment.interface';

export default class Visitor {
  static getComment(data: {
    blogger_id?: number;
    article_id?: number;
  }): Promise<Comment> {
    return API.get('/message/visitor/info', {
      params: data,
    });
  }

  static getList(
    page: number,
    size: number,
    commentId: number,
  ): Promise<CommentResponse> {
    return API.get('/message/visitor/list', {
      params: {
        page,
        size,
        comment_id: commentId,
      },
    });
  }
}
