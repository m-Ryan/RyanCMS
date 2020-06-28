import { User } from '../types/user.interface';
import services from '../services';
export type BloggerState = User | null;

export const blogger = {
  state: null as BloggerState,
  reducers: {

  },
  effects: {
    async getUser(state: BloggerState, payload: Parameters<typeof services.user.visitor.getBaseUser>[0]) {
      return services.user.visitor.getBaseUser(payload);
    },
  },
};
