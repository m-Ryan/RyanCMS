import { API } from '../services/API';
import { Dispatch } from 'redux';
import Model from '../react-redux-model/Model';
import { Resume } from '../interface/user.interface';
export default new class Resumes implements Model<Resume[]> {
  nameSpace = 'resumes';

  state: Resume[] = [];

  reducers = {
    set: (state: Resume[], payload: Resume[]) => {
      return payload;
    },
    add: (state: Resume[], payload: Resume) => {
      state.push(payload);
      return [...state];
    },
  };

  effects = {
    get: async (state: Resume[], payload: number, dispatch: Dispatch) => {
      let resume = state.filter(item => item.user_id === payload)[0];
      if (!resume) {
        resume = await API.user.visitor.getResume(payload);
        dispatch({ type: 'resumes/add', payload: resume });
      }
      return resume;
    },
  };
}();
