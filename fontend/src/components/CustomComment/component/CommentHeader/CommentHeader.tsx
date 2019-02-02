import React from 'react';
import styles from './CommentHeader.module.scss';
import { Button, Input, message } from 'antd';
import { User } from '../../../../interface/user.interface';
import { ReactAutoBind } from '../../../../util/decorators/reactAutoBind';
import { API } from '../../../../services/API';
import { catchError } from '../../../../util/decorators/catchError';
import { loading } from '../../../../util/decorators/loading';
import { Message } from '../../../../interface/comment.interface';
import { EditorInput } from '../EditorInput/EditorInput';
import { Link } from 'react-router-dom';

interface Props {
	user?: User;
	commentId: number;
	postComment: (message: Message) => any;
}
interface State {
	visible: boolean;
	content: string;
	loading: boolean;
}
@ReactAutoBind()
export default class CommentHeader extends React.PureComponent<Props, State> {
	state: State = {
		visible: false,
		loading: false,
		content: ''
	};

	setVisible() {
		this.setState({
			visible: !this.state.visible
		});
	}

	setContent(e: React.ChangeEvent<HTMLTextAreaElement>) {
		this.setState({
			content: e.target.value
		});
	}

	@catchError()
	@loading()
	async submit() {
		const { content } = this.state;
		const { commentId } = this.props;
		const result = await API.comment.user.postComment(commentId, content);
		this.props.postComment(result);
		message.success('发表评论成功');
		this.setState({
			visible: false,
			content: ''
		});
	}

	render() {
		const { user } = this.props;
		const { visible, loading } = this.state;

		return (
			<div className={styles['container']}>
				<h2 className={styles['header']}>
					<div>留言区</div>
					{user ? (
						<div>
							<Button type="primary" onClick={this.setVisible}>
								留言
							</Button>
						</div>
					) : (
						<div>
							<Button>
								<Link to="/login">登录</Link>
							</Button>
							&emsp;
							<Button type="primary">注册</Button>
						</div>
					)}
				</h2>
				<EditorInput loading={loading} visible={visible} submit={this.submit} setContent={this.setContent} />
			</div>
		);
	}
}
