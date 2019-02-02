import { Dispatch } from 'redux';
export default interface Model<T> {
  nameSpace: string;

  state: T;

  reducers: {
    [key: string]: (state: T, payload: any) => T;
  };

  effects: {
    [key: string]: (state: T, payload: any, dispatch: Dispatch) => any;
  };
}
