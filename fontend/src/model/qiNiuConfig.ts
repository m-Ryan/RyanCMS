import { API } from '../services/API';
import { QiNiuConfig as IQiNiuConfig } from '../services/upload/user';
import { Dispatch } from 'redux';
import Model from '../react-redux-model/Model';

export default new class QiNiuConfig implements Model<IQiNiuConfig | null> {
  nameSpace = 'qiNiuConfig';

  state: IQiNiuConfig | null = null;

  reducers = {
    set: (state: IQiNiuConfig, payload: IQiNiuConfig) => {
      return payload;
    },
  };

  effects = {
    getConfig: async (
      state: IQiNiuConfig,
      payload: IQiNiuConfig,
      dispatch: Dispatch,
    ) => {
      if (!state) {
        state = await API.upload.user.getQiNiuConfig();
      }
      dispatch({ type: 'qiNiuConfig/set', payload: { ...state } });
      return state;
    },
  };
}();
