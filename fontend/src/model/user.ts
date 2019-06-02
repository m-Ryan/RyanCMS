import { User as IUser } from '../interface/user.interface';
import { API } from '../services/API';
import { UpdateUser } from '../services/user';
import TokenStorage from '../util/TokenStorage';
import { ReduxModel } from 'ryan-redux';
export default class UserModel extends ReduxModel<IUser | null> {
  nameSpace = 'user';

  state: IUser | null = null;

  setUser(payload: IUser) {
    if (payload.token) {
      TokenStorage.setToken(payload.token);
    }
    this.setState(payload);
    return payload;
  }

  logout() {
    TokenStorage.clearToken();
    this.setState(null);
  }

  async getUser() {
    if (!this.state) {
      this.state = await API.user.user.getInfo();
      this.setUser(this.state);
    }
    return this.state;
  }

  async postLogin(payload: { phone: string; password: string }) {
    const user = await API.user.visitor.login(payload.phone, payload.password);
    this.setUser(user);
    return user;
  }

  async postUpdate(payload: UpdateUser) {
    await API.user.user.update(payload);
    const user = { ...this.state!, ...payload };
    this.setUser(user);
    return user;
  }

  async postRegister(payload: {
    nickname: string;
    phone: string;
    password: string;
  }) {
    const user = await API.user.visitor.register(
      payload.nickname,
      payload.phone,
      payload.password,
    );
    this.setUser(user);
    return user;
  }
}
