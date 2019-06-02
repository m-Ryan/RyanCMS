import { API } from './../API';
import { Message } from '../../interface/comment.interface';

export default class User {
  static postComment(commentId: number, content: string): Promise<Message> {
    return API.post('/comment/user/create-message', {
      comment_id: commentId,
      content,
    });
  }

  static deleteMessage(messageId: number) {
    return API.get('/comment/user/delete-message', {
      params: {
        message_id: messageId,
      },
    });
  }

  static postReplay(messageId: number, content: string) {
    return API.post('/comment/user/create-replay', {
      message_id: messageId,
      content,
    });
  }

  static deleteReplay(replayId: number) {
    return API.get('/comment/user/delete-replay', {
      params: {
        replay_id: replayId,
      },
    });
  }
}
