import { User } from '../interface/user.interface';
import { API } from '../services/API';
import { Dispatch } from 'redux';
import Model from '../react-redux-model/Model';

export default new class Bloggers implements Model<User[]> {
  nameSpace = 'bloggers';

  state: User[] = [];

  reducers = {
    set: (state: User[], payload: User[]) => {
      return payload;
    },
    add: (state: User[], payload: User) => {
      let blogger = state.filter(item => item.user_id === payload.user_id)[0];
      if (!blogger) {
        state.push(payload);
      }
      return [...state];
    },
  };

  effects = {
    getByName: async (state: User[], payload: string, dispatch: Dispatch) => {
      let blogger = state.filter(item => item.nickname === payload)[0];
      if (!blogger) {
        blogger = await API.user.visitor.getByName(payload);
        dispatch({ type: 'bloggers/add', payload: blogger });
      }
      return blogger;
    },
  };
}();
