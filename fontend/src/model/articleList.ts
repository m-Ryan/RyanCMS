import { API } from '../services/API';
import { Article as IArticle, Article } from '../interface/article.interface';
import { Dispatch } from 'redux';
import Model from '../react-redux-model/Model';
export interface IArticleList {
  page: number;
  size: number;
  list: IArticle[];
  count: number;
  noMore: boolean;
}
export default new class ArticleList implements Model<IArticleList> {
  nameSpace = 'articleList';

  state: IArticleList = {
    page: 0,
    size: 10,
    list: [],
    count: 0,
    noMore: false,
  };

  reducers = {
    set: (state: IArticleList, payload: IArticleList) => {
      return payload;
    },
  };

  effects = {
    getList: async (
      state: IArticleList,
      payload: number,
      dispatch: Dispatch,
    ) => {
      state.page += 1;
      const result = await API.article.visitor.getList(
        state.page,
        state.size,
        payload,
      );
      state.count = result.count;
      state.list = [...state.list, ...result.list];
      state.noMore = result.list.length < state.size;
      dispatch({ type: 'articleList/set', payload: { ...state } });
      return state;
    },
  };
}();
