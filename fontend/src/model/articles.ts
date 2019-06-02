import { API } from '../services/API';
import { Article as IArticle } from '../interface/article.interface';
import { unescapeHTML } from '../util/escape';
import { ReduxModel } from 'ryan-redux';
export default class ArticlesModel extends ReduxModel<IArticle[]> {
  nameSpace = 'articles';

  state: IArticle[] = [];

  async getArticle(payload: { userId: number; title: string }) {
    let article = this.state.filter(item => item.title === payload.title)[0];
    if (!article) {
      article = await API.article.visitor.getArticle({
        user_id: payload.userId,
        title: payload.title,
      });
      article.content.content = unescapeHTML(article.content.content);
    }
    this.state.push(article);
    this.setState([...this.state]);

    return article;
  }
}
