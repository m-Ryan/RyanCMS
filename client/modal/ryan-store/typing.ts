import { Store } from 'redux';

export interface Modal<T> {
  state: T;
  reducers?: { [key: string]: (state: T, payload: any) => T; };
  effects?: { [key: string]: (state: T, payload: any) => Promise<T> | T; };
}

export type ActionFn<S extends any = any, T extends any = any> = (
  state?: S,
  payload?: T
) => S | Promise<S>;


export interface AppStore extends Store {
  actionMap: any;
  fnMap: {
    [key: string]: ActionFn;
  };
  awaitSSR: (timeout: number) => Promise<void>;
  endSSR: () => void;
  canRenderPage: boolean;
}