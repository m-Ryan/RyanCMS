import Model from './Model';
import { AnyAction, combineReducers } from 'redux';

type ModelObject<T> = { [P in keyof T]: T };

export function serializeModelState<T extends Model<any>>(arrs: T[]) {
  const obj = {} as ModelObject<T>;
  arrs.forEach(item => {
    obj[item.nameSpace] = function(state: T = item.state, action: AnyAction) {
      const nameSpace = action.type.split('/')[0];
      const method = action.type.split('/')[1];
      if (nameSpace === item.nameSpace) {
        if (typeof item.reducers[method] === 'function') {
          return item.reducers[method](state, action.payload);
        }
      }
      return state;
    };
  });
  return combineReducers(obj as any);
}
