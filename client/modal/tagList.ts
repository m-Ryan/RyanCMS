import services from '../services';
import { NumberString } from '../types/NumberString.interface';
import { ListResponse } from '../types/response/list.response';
import { Tag } from '../types/tag.interface';
export type TagList = ListResponse<Tag>;

export const tagList = {
	state: { count: 0, list: [] } as TagList,
	reducers: {},
	effects: {
		async getList(
			state: TagList,
			payload: {
				page?: NumberString;
				size?: NumberString;
				user_id: number;
			},
		) {
			return services.tag.visitor.getList({
				page: 1,
				size: 9999,
				...payload,
			});
		},
		async getAddminList(
			state: TagList,
		) {
			return services.tag.user.getList({
				page: 1,
				size: 9999,
			});
		},
		async deleteTag(
			state: TagList,
			payload: Parameters<typeof services.tag.user.deleteTag>[0]
		) {
			await services.tag.user.deleteTag(payload);
			return {
				...state,
				list: state.list.filter(item=>item.tag_id !== payload)
			}
		},
	},
};
