import { User as IUer, Resume } from '../../interface/user.interface';
import { API } from './../API';

export default class Visitor {
  static register(
    nickname: string,
    phone: string,
    password: string,
  ): Promise<IUer> {
    return API.post('/user/visitor/register', { nickname, phone, password });
  }

  static login(phone: string, password: string): Promise<IUer> {
    return API.post('/user/visitor/login', {
      phone,
      password,
    });
  }

  static getDomainList(): Promise<IUer[]> {
    return API.get('/domain-list');
  }

  static getBaseUser(params: {
    nickname?: string;
    domain?: string;
  }): Promise<IUer> {
    return API.get('/user/visitor/base_info', {
      params,
    });
  }

  static getResume(userId: number): Promise<Resume> {
    return API.get('/user/visitor/resume', {
      params: {
        user_id: userId,
      },
    });
  }
}
