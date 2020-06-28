import services from '../services';
import { Message, Comment } from '../types/comment.interface';
export type CommentState = {
  more: boolean;
  page: number;
	size: number;
	list: Message[];
	total: number;
	comment: Comment | null;
};

export const comment = {
	state: {
    more: false,
    page: 1,
    size: 1000,
    list: [],
    total: 0,
    comment: null,
  } as CommentState,
	reducers: {},
	effects: {
		async initComment(
			state: CommentState,
			payload: {
				blogger_id?: number;
				article_id?: number;
			}
		) {
			const { page, size } = state;
			const data = await services.comment.visitor.getComment(payload);
			const { list, count } = await services.comment.visitor.getList(page, size, data.comment_id);
      return {
				...state,
				list,
				total: count,
				more: count >= size,
        comment: data
      }
		},
		async replay(
			state: CommentState,
			payload: {
				message_id: number;
				content: string;
			}
		) {
			const replay = await services.comment.user.postReplay(payload.message_id, payload.content);
			state.list.forEach((item) => {
				if (item.message_id === payload.message_id) {
					item.replays.push(replay);
				}
			});
			return {
				...state
			}
		},
		async postComment(
			state: CommentState,
			payload: {
				comment_id: number;
				content: string;
			}
		) {
			const comment = await services.comment.user.postComment(payload.comment_id, payload.content);
			state.list.unshift(comment);
			return {
				...state
			}
		},
		async deleteMessage(
			state: CommentState,
			payload: {
				message_id: number;
			}
		) {
			await services.comment.user.deleteMessage(payload.message_id);
			state.list = state.list.filter((item) => item.message_id !== payload.message_id);
			return {
				...state
			}
		},
		async deleteReplay(
			state: CommentState,
			payload: {
				message_id: number;
				replay_id: number;
			}
		) {
			await services.comment.user.deleteReplay(payload.replay_id);
			state.list.forEach((item) => {
				if (item.message_id === payload.message_id) {
					item.replays = item.replays.filter((replay) => replay.replay_id !== payload.replay_id);
				}
			});
			return {
				...state
			}
		}
	},
};
