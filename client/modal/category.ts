import services from '../services';
import { Article } from '../types/article.interface';
import { Category } from '../types/category.interface';
export type CategoryState = Category | null;

export const category = {
	state: null as CategoryState,
	reducers: {},
	effects: {
		async addCategory(
			state: CategoryState,
			payload: Parameters<typeof services.category.user.createCategory>[0]
		) {
			return services.category.user.createCategory(payload);
		},
		async updateCategory(
			state: CategoryState,
			payload: Parameters<typeof services.category.user.updateCategory>[0]
		) {
			return services.category.user.updateCategory(payload);
		},
		async updateArticle(state: CategoryState, payload: Parameters<typeof services.article.user.updateArticle>[0]) {
			return services.article.user.updateArticle(payload);
		},
		async deleteArticle(state: CategoryState, payload: Parameters<typeof services.article.user.deleteArticle>[0]) {
			return services.article.user.deleteArticle(payload);
		}
	},
};
