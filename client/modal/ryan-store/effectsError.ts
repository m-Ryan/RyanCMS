import { useSelector } from 'react-redux';
import { useAppStore } from './useAppStore';
import { useCallback } from 'react';

const EFFECT_ERROR_ADD = 'effect_error_add';
const EFFECT_ERROR_REMOVE = 'effect_error_remove';

export function effectsError(effects: { message: string; code: number; }[] = [], action: { type: string, payload: any; }) {
  switch (action.type) {
    case EFFECT_ERROR_ADD:
      effects.push(action.payload);
      return [...effects];
    case EFFECT_ERROR_REMOVE:
      effects = effects.filter((item) => item !== action.payload);
      return [...effects];
    default: ;
  }
  return effects;
}

export function useEffectError() {
  const store = useAppStore();
  const list = useSelector<any, any>(state => state.effectsError);

  const addError = useCallback((payload: { message: string; code: number; }) => {
    store.dispatch({
      type: EFFECT_ERROR_ADD,
      payload
    });
  }, [store]);

  const removeError = useCallback((payload: { message: string; code: number; }) => {
    store.dispatch({
      type: EFFECT_ERROR_REMOVE,
      payload
    });
  }, [store]);

  return {
    list,
    addError,
    removeError
  };
}

export class ReduxEffectError {
  public message: string = '';
  public code: number = 0;
  public status = 0;
  constructor(error: {message: string, code: number,status?: number}) {
    this.message = error.message;
    this.code = error.code;
    this.status = error.status || error.code || 0;
  }
}
window.addEventListener('error', function(e: any){
  if (e.reason instanceof ReduxEffectError) {
    e.preventDefault();
    console.log('ReduxEffectError', e.reason);
    return true;
  }
});

window.addEventListener('unhandledrejection', function(e: any){
  if (e.reason instanceof ReduxEffectError) {
    e.preventDefault();
    console.log('ReduxEffectError', e.reason);
    return true;
  }
});