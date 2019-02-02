import React from 'react';
import styles from './Floor.module.scss';
import { message } from 'antd';
import { User } from '../../../../interface/user.interface';
import { ReactAutoBind } from '../../../../util/decorators/reactAutoBind';
import { Message, Replay as IReplay } from '../../../../interface/comment.interface';
import { API } from '../../../../services/API';
import { catchError } from '../../../../util/decorators/catchError';
import ShowItem from '../ShowItem/ShowItem';
import Replay from '../Replay/Replay';
interface Props {
	user?: User;
	data: Message;
	floorNumber: number;
	onDelete: (messageId: number) => any;
	onAdd: (message: Message) => any;
	onDeleteReplay: (replayId: number, messageId: number) => any;
	onAddReplay: (replay: IReplay, messageId: number) => any;
}
interface State {
	loading: boolean;
	visible: boolean;
	content: string;
}
@ReactAutoBind()
export default class Floor extends React.Component<Props, State> {
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
	async deleteMessage() {
		const { data } = this.props;
		await API.comment.user.deleteMessage(data.message_id);
		this.props.onDelete(data.message_id);
		message.success('删除成功');
	}

	render() {
		const { user, data, floorNumber, onDeleteReplay, onAddReplay } = this.props;
		return (
			<div className={styles['container']}>
				<ShowItem
					floorNumber={floorNumber}
					data={data}
					user={user}
					onDelete={this.deleteMessage}
					onSubmit={this.submit}
				/>
				<div className={styles['replays']}>
					{data.replays.map((item) => (
						<Replay
							key={item.replay_id}
							data={item}
							user={user}
							onDeleteReplay={onDeleteReplay}
							onAddReplay={onAddReplay}
						/>
					))}
				</div>
			</div>
		);
	}
}
