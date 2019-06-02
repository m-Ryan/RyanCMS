import { Button, message } from 'antd';
import * as React from 'react';
import { RouteProps, RouterProps } from 'react-router';
import * as styles from './IntroSetting.module.scss';
import LayoutTitle from '../../components/LayoutTitle/LayoutTitle';
import CustomEditor from '@/components/CustomEditor/CustomEditor';
import { API } from '@/services/API';
import { ClearUnmountState } from '@/util/decorators/clearUnmountState';
import { User } from '@/interface/user.interface';
import { ReactAutoBind } from '@/util/decorators/reactAutoBind';
import { loading } from '@/util/decorators/loading';
import { catchError } from '@/util/decorators/catchError';
import { routerModel } from '../../../../model';
import { Link } from 'react-router-dom';

interface Props extends RouteProps, RouterProps {
	user: User;
}

interface State {
	loading: boolean;
	initLoading: boolean;
	resume: string;
}

@ClearUnmountState()
@ReactAutoBind()
export default class IntroSetting extends React.Component<Props, State> {
	state: State = {
		loading: false,
		initLoading: false,
		resume: ''
	};

	componentDidMount() {
		this.getResume();
	}

	@catchError()
	async getResume() {
		this.setState(
			{
				initLoading: true
			},
			async () => {
				const resume = await API.user.user.getResume();
				this.setState({
					resume: resume.content,
					initLoading: false
				});
			}
		);
	}

	onChangeContent(value: string) {
		return new Promise((resolve) => {
			this.setState(
				{
					resume: value
				},
				resolve
			);
		});
	}

	@catchError()
	@loading()
	async submit() {
		const { resume } = this.state;
		await API.user.user.updateResume(resume);
		message.success('更新成功');
	}

	public render() {
		const { loading, resume, initLoading } = this.state;
		return (
			<div className={styles['container']}>
				<LayoutTitle
					title="关于我的"
					aside={
						<Button loading={loading} type="primary" onClick={() => this.submit()}>
							提交
						</Button>
					}
				/>

				{!initLoading && (
					<CustomEditor
						placeholder="个人的介绍、想法等等..."
						initValue={resume}
						uploadAddress={'/api/upload/user/image'}
						onChange={this.onChangeContent}
						height={'calc(100vh - 200px)'}
					/>
				)}
			</div>
		);
	}
}
