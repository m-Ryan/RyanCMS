import { API } from '../services/API';
import { Resume } from '../interface/user.interface';
import { ReduxModel } from 'ryan-redux';
class ResumesModel extends ReduxModel<Resume[]> {
	nameSpace = 'resumes';

	state: Resume[] = [];

	addResume(payload: Resume) {
		this.state.push(payload);
		this.setState([ ...this.state ]);
	}

	async getResume(payload: number) {
		let resume = this.state.filter((item) => item.user_id === payload)[0];
		if (!resume) {
			resume = await API.user.visitor.getResume(payload);
			this.addResume(resume);
		}
		return resume;
	}
}

const resumeModel = new ResumesModel();

export default resumeModel;
