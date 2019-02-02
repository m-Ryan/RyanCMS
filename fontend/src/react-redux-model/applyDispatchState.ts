import { Store } from 'redux';
import Model from './Model';

export default function applyDispatchState<T extends Model<any>>(
  model: T[],
  store: Store,
) {
  return function(action: { type: string; payload?: any }) {
    const nameSpace = action.type.split('/')[0];
    const methodName = action.type.split('/')[1];
    for (let key in model) {
      const instance = model[key];
      if (
        instance.nameSpace === nameSpace &&
        typeof instance.effects[methodName] === 'function'
      ) {
        try {
          return instance.effects[methodName](
            store.getState()[nameSpace],
            action.payload,
            store.dispatch,
          );
        } catch (error) {
          return error;
        }
      }
    }
    return store.dispatch(action);
  };
}
