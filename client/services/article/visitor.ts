import { Article } from '@/client/types/article.interface';
import { request } from '../axios.config';
import { ListResponse } from '@/client/types/response/list.response';
import { NumberString } from '@/client/types/NumberString.interface';

export const visitor = {
	getArticle(data: {
		user_id: number;
		title?: string;
	} | {
		user_id: number;
		article_id?: number;
	}): Promise<Article> {
		return request.get('/article/visitor/detail', {
			params: data,
		});
	},
	getList(params: {
		page: NumberString;
		size?: NumberString;
		user_id: number;
		category_id?: number;
		tag_id?: number;
		order?: string;
	}): Promise<ListResponse<Article>> {
		return request.get('/article/visitor/list', {
			params: {
				size: 10,
				...params,
			},
		});
	},
	search(
		title: string,
		page: number,
		size: number,
		userId: number,
	): Promise<ListResponse<Article>> {
		return request.get('/article/visitor/search', {
			params: {
				page,
				size,
				title,
				user_id: userId,
			},
		});
	},
};
