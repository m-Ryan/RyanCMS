import { API } from '../services/API';
import { Article as IArticle } from '../interface/article.interface';
import { ReduxModel } from 'ryan-redux';
export interface IArticleList {
  page: number;
  size: number;
  list: IArticle[];
  count: number;
  noMore: boolean;
}
export default class ArticleListModel extends ReduxModel<IArticleList> {
  nameSpace = 'articleList';

  state: IArticleList = {
    page: 0,
    size: 10,
    list: [],
    count: 0,
    noMore: false,
  };

  async getList(payload: number) {
    const state = this.state;
    state.page += 1;
    const result = await API.article.visitor.getList(
      state.page,
      state.size,
      payload,
    );
    state.count = result.count;
    state.list = [...state.list, ...result.list];
    state.noMore = result.list.length < state.size;
    this.setState({ ...state });
    return state;
  }
}
