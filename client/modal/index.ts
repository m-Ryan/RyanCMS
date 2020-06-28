import { createLogger } from 'redux-logger';
import { applyMiddleware } from 'redux';

import { user } from './user';
import { config } from './config';
import { blogger } from './blogger';
import { createStore } from './ryan-store';
import { articleList } from './articleList';
import { article } from './article';
import { isServer, isDevelopment } from '../utils/tools';
import { comment } from './comment';
import { recordList } from './recordList';
import { tagList } from './tagList';
import { resume } from './resume';
import { categoryList } from './categoryList';
import { tag } from './tag';
import { category } from './category';
import { themeColor } from './themeColor';

let middleware = undefined;

if (isDevelopment() && !isServer()) {
  const loggerMiddleware = createLogger();
  middleware = applyMiddleware(loggerMiddleware);
}

export const modelsMap = {
  user,
  config,
  blogger,
  articleList,
  recordList,
  article,
  tag,
  comment,
  tagList,
  resume,
  category,
  themeColor,
  categoryList
};

export const { store } = createStore(
  modelsMap,
  window.__INITIAL_STATE__ || {},
  middleware
);


export type AppState = {
  [K in keyof typeof modelsMap]: typeof modelsMap[K]['state'];
};
