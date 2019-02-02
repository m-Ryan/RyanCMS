import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import applyDispatchState from './react-redux-model/applyDispatchState';
import { model } from './model';
import { reducers } from './reducers';
// 通过服务端注入的全局变量得到初始 state
declare global {
  interface Window {
    __INITIAL_STATE__: Object | undefined;
  }
  namespace NodeJS {
    interface Global {
      window: any;
      File: any;
      Blob: any;
    }
  }
}
if (typeof window === 'undefined') {
  global.window = {};
}
if (typeof Blob === 'undefined') {
  global.Blob = class Blob {
    constructor() {}
  };
}
const preloadedState = window.__INITIAL_STATE__ || {}; //
const loggerMiddleware = createLogger();
export const store = createStore(
  reducers,
  preloadedState,
  applyMiddleware(thunkMiddleware, loggerMiddleware),
);
export const dispatchState = applyDispatchState(model, store);
