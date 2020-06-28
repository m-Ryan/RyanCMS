import services from '../services';
import { NumberString } from '../types/NumberString.interface';
import { ListResponse } from '../types/response/list.response';
import { Category } from '../types/category.interface';
export type CategoryList = ListResponse<Category>;

export const categoryList = {
	state: { count: 0, list: [] } as CategoryList,
	reducers: {},
	effects: {
		async getList(
			state: CategoryList,
			payload: {
				page: NumberString;
				size?: string | number;
				user_id: number;
				category_id?: number;
				tag_id?: number;
				order?: string;
			},
		) {
			return services.category.user.getList({
				page: 1,
				size: 9999
			});
		},
		async getAddminList(
			state: CategoryList,
		) {
			return services.category.user.getList({
				page: 1,
				size: 9999,
			});
		},
		async deleteCategory(
			state: CategoryList,
			payload: Parameters<typeof services.category.user.deleteCategory>[0]
		) {
			await services.category.user.deleteCategory(payload);
			return {
				...state,
				list: state.list.filter(item=>item.category_id !== payload)
			}
		},
	},
};
