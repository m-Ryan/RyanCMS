import services from '../services';
import { Article } from '../types/article.interface';
import { Tag } from '../types/tag.interface';
export type TagState = Tag | null;

export const tag = {
	state: null as TagState,
	reducers: {},
	effects: {
		async addTag(
			state: TagState,
			payload: Parameters<typeof services.tag.user.createTag>[0]
		) {
			return services.tag.user.createTag(payload);
		},
		async updateTag(
			state: TagState,
			payload: Parameters<typeof services.tag.user.updateTag>[0]
		) {
			return services.tag.user.updateTag(payload);
		},
		async updateArticle(state: TagState, payload: Parameters<typeof services.article.user.updateArticle>[0]) {
			return services.article.user.updateArticle(payload);
		},
		async deleteArticle(state: TagState, payload: Parameters<typeof services.article.user.deleteArticle>[0]) {
			return services.article.user.deleteArticle(payload);
		}
	},
};
