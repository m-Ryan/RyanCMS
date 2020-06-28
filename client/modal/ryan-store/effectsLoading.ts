import { useAppStore } from './useAppStore';
import { useSelector } from 'react-redux';

const EFFECT_START = 'effect_start';
const EFFECT_END = 'effect_end';

export function effectsLoading(effects: { [key: string]: boolean; } = {}, action: { type: string, payload: string; }) {
  switch (action.type) {
    case EFFECT_START:
      effects[action.payload] = true;
      return { ...effects };
    case EFFECT_END:
      effects[action.payload] = false;
      return { ...effects };

    default: return effects;
  }
}

export function useEffectLoading() {
  const store = useAppStore();
  const effectsLoading = useSelector<any, any>(state => state.effectsLoading);
  return (...methods: any[]): boolean => {
    return methods.some(method => {
      const type = Object.keys(store.fnMap).find(item => store.fnMap[item] === method);
      if (!type) {
        throw new Error(`未匹配 ${type}`);
      }
      return effectsLoading[type];
    });
  };
}
