import { useAppStore } from './useAppStore';
import { useCallback } from 'react';
import { ActionFn } from './typing';

export function useAppDispatch() {
  const store = useAppStore();
  const actionMap = store.actionMap;
  const fnMap = store.fnMap;
  return useCallback(<T extends ActionFn>(method: T) => {
    const type = Object.keys(fnMap).find(item => fnMap[item] === method);
    if (!type) {
      throw new Error(`未匹配 ${type}`);
    }
    return actionMap[type] as (payload?: Parameters<T>[1]) => ReturnType<T>;
  }, [actionMap, fnMap]);
}

