import React from 'react';
import styles from './Replay.module.scss';
import { message } from 'antd';
import { User } from '../../../../interface/user.interface';
import { ReactAutoBind } from '../../../../util/decorators/reactAutoBind';
import { Replay as IReplay } from '../../../../interface/comment.interface';
import { catchError } from '../../../../util/decorators/catchError';
import ShowItem from '../ShowItem/ShowItem';
import { API } from '../../../../services/API';
interface Props {
	user?: User;
	data: IReplay;
	onDeleteReplay: (replayId: number, messageId: number) => any;
	onAddReplay: (replay: IReplay, messageId: number) => any;
}

@ReactAutoBind()
export default class Replay extends React.Component<Props> {
	@catchError()
	async submit(content: string) {
		const { data } = this.props;
		const result = await API.comment.user.postReplay(data.message_id, content);
		this.props.onAddReplay(result, data.message_id);
		message.success('评论成功');
		this.setState({
			visible: false,
			content: ''
		});
	}

	@catchError()
	async deleteReplay() {
		const { data } = this.props;
		await API.comment.user.deleteReplay(data.replay_id);
		this.props.onDeleteReplay(data.replay_id, data.message_id);
		message.success('删除成功');
	}

	render() {
		const { user, data } = this.props;
		return (
			<div className={styles['container']}>
				<ShowItem data={data} user={user} onDelete={this.deleteReplay} onSubmit={this.submit} />
			</div>
		);
	}
}
