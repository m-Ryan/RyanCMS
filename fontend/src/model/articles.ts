import { API } from '../services/API';
import { Article as IArticle } from '../interface/article.interface';
import { Dispatch } from 'redux';
import Model from '../react-redux-model/Model';
export default new class Articles implements Model<IArticle[]> {
  nameSpace = 'articles';

  state: IArticle[] = [];

  reducers = {
    add: (state: IArticle[], payload: IArticle) => {
      state.push(payload);
      return [...state];
    },
    set: (state: IArticle[], payload: IArticle[]) => {
      return payload;
    },
  };

  effects = {
    get: async (
      state: IArticle[],
      payload: { userId: number; title: string },
      dispatch: Dispatch,
    ) => {
      let article = state.filter(item => item.title === payload.title)[0];
      if (!article) {
        article = await API.article.visitor.getArticle({
          user_id: payload.userId,
          title: payload.title,
        });
      }
      dispatch({ type: 'articles/add', payload: article });
      return article;
    },
  };
}();
