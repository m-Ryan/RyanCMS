import services from '../services';
import { Article } from '../types/article.interface';
export type ArticleState = Article | null;

export const article = {
	state: null as ArticleState,
	reducers: {
		setArticle(
			state: ArticleState,
			payload: ArticleState) {
			return payload;
		},
	},
	effects: {
		async getArticle(
			state: ArticleState,
			payload: {
				user_id: number;
				title?: string;
			} | {
				user_id: number;
				article_id?: number;
			}
		) {
			return services.article.visitor.getArticle(payload);
		},
		async getAdminArticle(
			state: ArticleState,
			payload: Parameters<typeof services.article.user.getArticle>[0]) {
			return services.article.user.getArticle(payload);
		},
		async createArticle(state: ArticleState, payload: Parameters<typeof services.article.user.createArticle>[0]) {
			return services.article.user.createArticle(payload);
		},
		async updateArticle(state: ArticleState, payload: Parameters<typeof services.article.user.updateArticle>[0]) {
			await services.article.user.updateArticle(payload);
			return services.article.user.getArticle({ article_id: payload.article_id });
		},
		async deleteArticle(state: ArticleState, payload: Parameters<typeof services.article.user.deleteArticle>[0]) {
			return services.article.user.deleteArticle(payload);
		}
	},
};
