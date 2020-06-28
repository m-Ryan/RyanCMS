import { request } from '../axios.config';
import { Message, Replay } from '@/client/types/comment.interface';

export const user = {
  postComment(commentId: number, content: string): Promise<Message> {
    return request.post('/comment/user/create-message', {
      comment_id: commentId,
      content,
    });
  },
  deleteMessage(messageId: number) {
    return request.get('/comment/user/delete-message', {
      params: {
        message_id: messageId,
      },
    });
  },
  postReplay(messageId: number, content: string):Promise<Replay> {
    return request.post('/comment/user/create-replay', {
      message_id: messageId,
      content,
    });
  },
  deleteReplay(replayId: number) {
    return request.get('/comment/user/delete-replay', {
      params: {
        replay_id: replayId,
      },
    });
  }
}
