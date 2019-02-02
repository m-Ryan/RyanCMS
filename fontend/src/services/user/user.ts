import { User as IUer, Resume } from '../../interface/user.interface';
import { API } from './../API';
import { UpdateUser } from '.';

export default class User {
  static update(data: UpdateUser): Promise<IUer> {
    return API.post('/user/user/update', data);
  }

  static getInfo(): Promise<IUer> {
    return API.get('/user/user/info');
  }

  static getResume(): Promise<Resume> {
    return API.get('/user/user/resume');
  }

  static updateResume(content: string): Promise<Resume> {
    return API.post('/user/user/update-resume', { content });
  }
}
