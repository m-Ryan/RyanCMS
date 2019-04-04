import { createStore } from 'ryan-redux';
import * as model from './model';
import { createLogger } from 'redux-logger';
import { applyMiddleware } from 'redux';
// 通过服务端注入的全局变量得到初始 state

if (typeof window === 'undefined') {
  global.window = {};
}

const preloadedState = window.__INITIAL_STATE__ || {}; //
const loggerMiddleware = createLogger();
export const store = createStore(
  model,
  preloadedState,
  applyMiddleware(loggerMiddleware),
);
