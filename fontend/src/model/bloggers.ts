import { User } from '../interface/user.interface';
import { API } from '../services/API';
import { ReduxModel } from 'ryan-redux';

export default class BloggersModel extends ReduxModel<User[]> {
	nameSpace = 'bloggers';

	state: User[] = [];

	add(payload: User) {
		let blogger = this.state.filter((item) => item.user_id === payload.user_id)[0];
		if (!blogger) {
			this.state.push(payload);
		}
		this.setState([ ...this.state ]);
	}

	async getByName(payload: string) {
		let blogger = this.state.filter((item) => item.nickname === payload)[0];
		if (!blogger) {
			blogger = await API.user.visitor.getBaseUser({ nickname: payload });
			this.add(blogger);
		}
		return blogger;
	}

	async getByDomain(payload: string) {
		let blogger = this.state.filter((item) => item.domain === payload)[0];
		if (!blogger) {
			blogger = await API.user.visitor.getBaseUser({ domain: payload });
			this.add(blogger);
		}
		return blogger;
	}

	// 独立域名的时候，只有一个blogger
	getCurrentBlogger() {
		return this.state[0];
	}
}
