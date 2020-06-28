import { combineReducers, createStore as createReduxStore, StoreEnhancer } from 'redux';
import EventEmitter from 'eventemitter3';
import { Modal, AppStore } from './typing';
import { ReduxEffectError } from './effectsError';
import { effectsLoading } from './effectsLoading';
import { effectsError } from './effectsError';
import { SSR_TIMEOUT_OUT } from '@/client/constant';

function createReducer<T>(modal: Modal<T>, prefix: string) {
  return (state = modal.state, action: { type: string; payload: T; }) => {
    const reducers = modal.reducers || {};
    const reducer = Object.keys(reducers).find(
      (name) => action.type === prefix + '_reducers_' + name
    );
    if (reducer) {
      return reducers[reducer](state, action.payload);
    }
    const effects = modal.effects || {};
    const effect = Object.keys(effects).find(
      (name) => action.type === prefix + '_effects_' + name
    );
    if (effect) {
      return action.payload;
    }
    return state;
  };
}

export function createStore<T extends { [key: string]: Modal<any>; }>(
  modelObj: T,
  initProps: any = {},
  storeEnhancer?: StoreEnhancer
) {
  const modalMap: { [key: string]: any; } = {};
  const actionMap: any = {};
  const fnMap: any = {};
  Object.keys(modelObj).forEach((key) => {
    modalMap[key] = createReducer(modelObj[key], key);
  });

  const rootReducer = combineReducers({ ...modalMap, effectsLoading, effectsError });
  const store = createReduxStore(rootReducer, initProps, storeEnhancer) as AppStore;
  Object.keys(modelObj).forEach((key) => {
    const model = modelObj[key];
    model.reducers &&
      Object.keys(model.reducers).forEach((method) => {
        const fn = model.reducers![method];
        const actionType = key + '_reducers_' + fn.name;
        fnMap[actionType] = fn;
        actionMap[actionType] = (payload: ReturnType<typeof fn>) => {
          store.dispatch({
            type: actionType,
            payload,
          });
        };
      });
    model.effects &&
      Object.keys(model.effects).forEach((methodName) => {
        const fn = model.effects![methodName];
        const actionType = key + '_effects_' + methodName;
        fnMap[actionType] = fn;
        actionMap[actionType] = async (payload: any) => {
          store.dispatch({
            type: 'effect_start',
            payload: actionType,
          });

          try {
            const data = await fn(store.getState()[key], payload);
            store.dispatch({
              type: actionType,
              payload: data,
            });
            store.dispatch({
              type: 'effect_end',
              payload: actionType,
            });
            return data;
          } catch (error) {
            store.dispatch({
              type: 'effect_error_add',
              payload: error,
            });
            store.dispatch({
              type: 'effect_end',
              payload: actionType,
            });
            throw new ReduxEffectError(error);
          }
        };
      });
  });
  const eventEmitter = new EventEmitter();
  store.awaitSSR = async (timeout: number) => {
    return new Promise((resolve, reject) => {
      if (store.canRenderPage) {
        resolve();
      }
      setTimeout(() => {
        reject(new ReduxEffectError({ message: '获取资源超时，请重新加载', code: SSR_TIMEOUT_OUT }));
      }, timeout);
      eventEmitter.on('SSR_END', () => {
        resolve();
      });
    });
  };

  store.endSSR = () => {
    store.canRenderPage = true;
    eventEmitter.emit('SSR_END');
  };

  store.actionMap = actionMap;
  store.fnMap = fnMap;
  store.canRenderPage = false;

  return {
    store,
  };
}

