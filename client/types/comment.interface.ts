import { User } from './user.interface';

export interface Comment {
  comment_id: number;
  article_id: number;
  blogger_id: number;
}

export interface Message {
  comment_id: number;
  message_id: number;
  user: User;
  content: string;
  created_at: string;
  replays: Replay[];
}

export interface Replay {
  replay_id: number;
  message_id: number;
  user: User;
  content: string;
  created_at: string;
}
