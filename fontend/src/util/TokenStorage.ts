import { TOKEN } from '../config/constant';

export default class TokenStorage {
  static setToken(token: string) {
    window.localStorage.setItem(TOKEN, token);
  }

  static getToken() {
    // 服务端调用
    return window.localStorage.getItem(TOKEN);
  }

  static clearToken() {
    window.localStorage.setItem(TOKEN, '');
  }
}
