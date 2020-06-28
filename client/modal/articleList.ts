import services from '../services';
import { Article } from '../types/article.interface';
import { NumberString } from '../types/NumberString.interface';
import { ListResponse } from '../types/response/list.response';
export type ArticleList = ListResponse<Article> & { page: NumberString; };

export const articleList = {
	state: { count: 0, list: [], page: 0 } as ArticleList,
	reducers: {},
	effects: {
		async getList(
			state: ArticleList,
			payload: {
				page: NumberString;
				size?: string | number;
				user_id: number;
				category_id?: number;
				tag_id?: number;
				order?: string;
			},
		) {

			const data = await services.article.visitor.getList(payload);
			return {
				...data,
				page: payload.page
			};
		},
		async getAdminList(
			state: ArticleList,
			payload: Parameters<typeof services.article.user.getList>[0],
		) {
			const data = await services.article.user.getList(payload);
			return {
				...data,
				page: payload.page
			};
		},
	},

};
