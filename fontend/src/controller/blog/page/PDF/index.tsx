import React from 'react';
import { catchError } from '@/util/decorators/catchError';
import { API } from '@/services/API';
import { History, Location } from 'history';
import { User, Resume } from '@/interface/user.interface';
import ReactMarkdown from 'react-markdown';
import LightCode from '@/components/LightCode/LightCode';
import { EmptyPlaceholder } from '@/components/EmptyPlaceholder/EmptyPlaceholder';
import { CustomLoading } from '@/components/CustomLoading/CustomLoading';
import CustomEditor from '@/components/CustomEditor/CustomEditor';
import { connect } from 'ryan-redux';
import { checkRenderFromServer } from '@/util/decorators/checkRenderFromServer';
import { resumeModel } from '@/model';
import { ClearUnmountState } from '@/util/decorators/clearUnmountState';
import styles from './index.module.scss';
CustomEditor;
interface Props {
	history: History;
	location: Location;
	blogger: User;
	user?: User;
	resumes: Resume[];
}
interface State {}
interface ConnectProps {
	resumes: Resume[];
}
@connect(({ resumes }: ConnectProps) => ({ resumes }))
@ClearUnmountState()
export default class PDF extends React.PureComponent<Props, State> {
	componentDidMount() {
		this.initData();
	}

	@checkRenderFromServer()
	async initData() {
		this.getResume();
	}

	@catchError()
	async getResume() {
		const { blogger } = this.props;
		await resumeModel.getResume(blogger.user_id);
	}

	static async initServerData(blogger: User, pathname: string): Promise<{ resumes: Resume[] }> {
		const resume = await API.user.visitor.getResume(blogger.user_id);
		return {
			resumes: [ resume ]
		};
	}

	render() {
		const { blogger, user, resumes } = this.props;
		const resume = resumes.filter((item) => item.user_id === blogger.user_id)[0];
		return (
			<div className={styles['container']}>
				{resumes ? (
					<div className={styles['detail']}>
						{resume && resume.content ? (
							<React.Fragment>
								<ReactMarkdown
									className={`ry-table`}
									source={resume.content}
									renderers={{ code: LightCode as any }}
									escapeHtml={false}
								/>
							</React.Fragment>
						) : (
							<EmptyPlaceholder size={72}>
								<div style={{ fontSize: '14px' }}>这个人很懒，什么都没有留下...</div>
							</EmptyPlaceholder>
						)}
					</div>
				) : (
					<CustomLoading />
				)}
			</div>
		);
	}
}
