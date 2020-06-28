import { User } from '../types/user.interface';
import services from '../services';
import { UserStorage } from '../utils/user-storage';
import { BASE_NAME } from '../constant';

type UserState = User | null;
export const user = {
  state: null as UserState,
  reducers: {
    logout(): null {
      UserStorage.logout();
      return null;
    }
  },
  effects: {
    async register(state: UserState, payload: Parameters<typeof services.user.visitor.register>[0]) {
      const user = await services.user.visitor.register(payload);
      UserStorage.setToken(user.token, true);
      return user;
    },
    async login(state: UserState, payload: { phone: string; password: string; }) {
      const user = await services.user.visitor.login(payload.phone, payload.password);
      UserStorage.setToken(user.token, true);
      return user;
    },
    async auth(state: UserState, permissionRequired?: boolean) {
      if (!UserStorage.getToken()) {
        if (permissionRequired) {
          window.location.replace('/');
        }
        return state;
      }
      try {
        const data = await services.user.user.getInfo();
        return data;
      } catch (error) {
        if (permissionRequired) {
          if (error.code === 403) {
            UserStorage.logout();
          } else {
            window.history.back();
          }
        }
        return state;
      }
    },
    async updateInfo(state: UserState, payload: Parameters<typeof services.user.user.update>[0]) {
      await services.user.user.update(payload);
      return services.user.user.getInfo();
    },
    async updateTheme(state: UserState, payload: Parameters<typeof services.user.user.updateTheme>[0]) {
      await services.user.user.updateTheme(payload);
      return services.user.user.getInfo();
    },
  },
};
