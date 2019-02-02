import React from 'react';
import styles from './ShowItem.module.scss';
import { Button, message, Popconfirm } from 'antd';
import { User } from '../../../../interface/user.interface';
import { ReactAutoBind } from '../../../../util/decorators/reactAutoBind';
import { Message, Replay } from '../../../../interface/comment.interface';
import dayjs from 'dayjs';
import { loading } from '../../../../util/decorators/loading';
import { EditorInput } from '../EditorInput/EditorInput';
interface Props {
	user?: User;
	data: Message | Replay;
	placeholder?: string;
	floorNumber?: number;
	onDelete: () => any;
	onSubmit: (content: string) => any;
}
interface State {
	loading: boolean;
	visible: boolean;
	content: string;
}
@ReactAutoBind()
export default class ShowItem extends React.Component<Props, State> {
	state: State = {
		visible: false,
		content: '',
		loading: false
	};

	setVisible() {
		this.setState({
			visible: !this.state.visible
		});
	}

	showInput() {
		const { user } = this.props;
		if (!user) {
			message.warn('请先登录');
		} else {
			this.setVisible();
		}
	}

	onChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
		this.setState({
			content: e.target.value
		});
	}

	onDelete() {
		this.props.onDelete();
	}

	@loading()
	async onSubmit() {
		const { content } = this.state;
		await this.props.onSubmit(content);
		this.setState({
			visible: false
		});
	}

	render() {
		const { user, data, floorNumber, placeholder = '发表留言' } = this.props;
		const { visible, loading } = this.state;
		const isEditor = user && data.user.user_id === user.user_id;
		return (
			<div className={styles['container']}>
				<div className={styles['header']}>
					<img src={data.user.avatar} alt="" />
					<div className={styles['info']}>
						<div className={styles['name']}>
							<span>{data.user.nickname}</span>
						</div>
						<div>
							<span>
								{floorNumber && `${floorNumber}楼`}
								&nbsp;
								{dayjs(+data.created_at * 1000).format('YYYY-MM-DD')}
							</span>
						</div>
					</div>
				</div>
				<div className={styles['content']}>
					<div>
						{data.content}
						<div className={styles['replay-btn']}>
							{isEditor ? (
								<Popconfirm title="你确定要删除吗？" okText="确定" cancelText="取消" onConfirm={this.onDelete}>
									<Button size="small" type="primary">
										删除
									</Button>
								</Popconfirm>
							) : (
								<Button size="small" type="primary" onClick={this.showInput}>
									{visible ? '关闭' : '回复'}
								</Button>
							)}
						</div>
					</div>
				</div>
				<EditorInput
					loading={loading}
					visible={visible}
					submit={this.onSubmit}
					setContent={this.onChange}
					placeholder={placeholder}
				/>
			</div>
		);
	}
}
