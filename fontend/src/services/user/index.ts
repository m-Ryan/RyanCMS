import User from './user';
import Visitor from './visitor';

export interface UpdateUser {
  nickname?: string;
  phone?: string;
  password?: string;
  sex?: number;
  intro?: string;
  avatar?: string;
  github?: string;
  weibo?: string;
  email?: string;
  zhihu?: string;
}

export const UserService = {
  user: User,
  visitor: Visitor,
};
