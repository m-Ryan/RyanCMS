import User from './user';
import Visitor from './visitor';
import { Message } from '../../interface/comment.interface';

export interface CommentResponse {
  list: Message[];
  count: number;
}

export const CommentService = {
  user: User,
  visitor: Visitor,
};
