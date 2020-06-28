import { request } from '../axios.config';
import { User, Resume } from '@/client/types/user.interface';

export const visitor = {
  register(payload: {
    nickname: string,
    phone: string,
    password: string,
  }): Promise<User> {
    return request.post('/user/visitor/register', payload);
  },
  login(phone: string, password: string): Promise<User> {
    return request.post('/user/visitor/login', {
      phone,
      password,
    });
  },
  getBaseUser(params: {
    nickname?: string;
    domain?: string;
  }): Promise<User> {
    return request.get('/user/visitor/base_info', {
      params,
    });
  },
  getResume(userId: number): Promise<Resume> {
    return request.get('/user/visitor/resume', {
      params: {
        user_id: userId,
      },
    });
  },
};
