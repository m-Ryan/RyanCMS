import services from '../services';
import { Resume } from '../types/user.interface';
export type ResumeState = Resume | null;

export const resume = {
	state: null as ResumeState,
	reducers: {},
	effects: {
		async getResume(
			state: ResumeState,
			payload: {
				user_id: number;
			}
		) {
			const data = await services.user.visitor.getResume(payload.user_id)
			return data;
		},
		async getAdminResume(
			state: ResumeState,
		) {
			const data = await services.user.user.getResume()
			return data;
		},
		async updateResume(
			state: ResumeState,
			payload: Parameters<typeof services.user.user.updateResume>[0]
		) {
			await services.user.user.updateResume(payload)
			const data = await services.user.user.getResume()
			return data;
		},
	},
};
