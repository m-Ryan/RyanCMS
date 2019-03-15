import { createStore } from 'ryan-redux';
import model from './model';
import { createLogger } from 'redux-logger';
import { applyMiddleware } from 'redux';
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
export const store = createStore(model, preloadedState, applyMiddleware(loggerMiddleware));
