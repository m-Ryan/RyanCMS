import { User as IUser } from '../interface/user.interface';
import { API } from '../services/API';
import { UpdateUser } from '../services/user';
import { Dispatch } from 'redux';
import Model from '../react-redux-model/Model';
import TokenStorage from '../util/TokenStorage';
export default new class User implements Model<IUser | null> {
  nameSpace = 'user';

  state = null;

  reducers = {
    set: (state: IUser, payload: IUser) => {
      if (payload.token) {
        TokenStorage.setToken(payload.token);
      }
      return payload;
    },
    logout: () => {
      TokenStorage.clearToken();
      return null;
    },
  };

  effects = {
    getUser: async (state: IUser, payload: any, dispatch: Dispatch) => {
      if (!state) {
        state = await API.user.user.getInfo();
      }
      dispatch({ type: 'user/set', payload: { ...state } });
    },
    postLogin: async (
      state: IUser,
      payload: { phone: string; password: string },
      dispatch: Dispatch,
    ) => {
      const user = await API.user.visitor.login(
        payload.phone,
        payload.password,
      );
      dispatch({ type: 'user/set', payload: { ...user } });
    },
    postUpdate: async (
      state: IUser,
      payload: UpdateUser,
      dispatch: Dispatch,
    ) => {
      await API.user.user.update(payload);
      dispatch({ type: 'user/getUser' });
    },
    postRegister: async (
      state: IUser,
      payload: { nickname: string; phone: string; password: string },
      dispatch: Dispatch,
    ) => {
      const user = await API.user.visitor.register(
        payload.nickname,
        payload.phone,
        payload.password,
      );
      dispatch({ type: 'user/set', payload: { ...user } });
    },
  };
}();
