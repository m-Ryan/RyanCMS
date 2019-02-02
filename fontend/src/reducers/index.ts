import { model } from '../model';
import { serializeModelState } from '../react-redux-model/serializeModel';
export const reducers = serializeModelState(model);
