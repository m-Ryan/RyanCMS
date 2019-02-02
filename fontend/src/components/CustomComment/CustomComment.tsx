import * as React from 'react';
import * as styles from './CustomComment.module.scss';
import CommentHeader from './component/CommentHeader/CommentHeader';
import { User } from '../../interface/user.interface';
import CommentList from './component/CommentList/CommentList';
import { Message, Comment, Replay } from '../../interface/comment.interface';
import { ClearUnmountState } from '../../util/decorators/clearUnmountState';
import { catchError } from '../../util/decorators/catchError';
import { API } from '../../services/API';
import { ReactAutoBind } from '../../util/decorators/reactAutoBind';
import { loading } from '../../util/decorators/loading';
import CustomScrollView from '../CustomScrollView/CustomScrollView';
import { EmptyPlaceholder } from '../EmptyPlaceholder/EmptyPlaceholder';
interface Props {
	user?: User;
	blogger: User;
	bloggerId?: number;
	articleId?: number;
	children?: React.ReactNode;
}
interface State {
	page: number;
	size: number;
	data: Message[];
	total: number;
	comment: Comment | null;
	loading: boolean;
	noMore: boolean;
}

@ClearUnmountState()
@ReactAutoBind()
export default class CustomComment extends React.PureComponent<Props, any> {
	state: State = {
		page: 1,
		size: 2,
		data: [],
		total: 0,
		comment: null,
		loading: false,
		noMore: false
	};

	async componentDidMount() {
		this.getCommentList();
	}

	@loading()
	@catchError()
	async getCommentList() {
		const { page, size, data } = this.state;
		const { articleId, bloggerId } = this.props;
		const comment = articleId
			? await API.comment.visitor.getComment({
					article_id: articleId
				})
			: await API.comment.visitor.getComment({
					blogger_id: bloggerId
				});
		const result = await API.comment.visitor.getList(page, size, comment.comment_id);
		this.setState({
			data: [ ...data, ...result.list ],
			total: result.count,
			noMore: result.list.length < size,
			page: page + 1,
			comment
		});
	}

	postComment(message: Message) {
		const { data, total } = this.state;
		data.unshift(message);
		this.setState({
			data: [ ...data ],
			total: total + 1
		});
	}

	onDelete(messageId: number) {
		const { data, total } = this.state;
		const newData = data.filter((item) => item.message_id !== messageId);
		this.setState({
			data: newData,
			total: total - 1
		});
	}
	onAdd(message: Message) {
		const { data, total } = this.state;
		data.unshift(message);
		this.setState({
			data: [ ...data ],
			total: total + 1
		});
	}

	onDeleteReplay(replayId: number, messageId: number) {
		const { data } = this.state;
		data.forEach((item) => {
			if (item.message_id === messageId) {
				item.replays = item.replays.filter((replay) => replay.replay_id !== replayId);
			}
		});
		this.setState({
			data: [ ...data ]
		});
	}

	onAddReplay(replay: Replay, messageId: number) {
		const { data } = this.state;
		data.forEach((item) => {
			if (item.message_id === messageId) {
				item.replays.unshift(replay);
			}
		});
		this.setState({
			data: [ ...data ]
		});
	}

	render() {
		const { user, children } = this.props;
		const { data, comment, loading, noMore, total } = this.state;
		return (
			<CustomScrollView
				className={`${styles['scrollview']}`}
				loadMore={this.getCommentList}
				showLoading
				noMore={noMore}
			>
				{children}
				<div className={styles['container']}>
					{comment && (
						<CommentHeader commentId={comment.comment_id} user={user} postComment={this.postComment} />
					)}
					{data.length > 0 && (
						<CommentList
							total={total}
							data={data}
							user={user}
							onDelete={this.onDelete}
							onAdd={this.onAdd}
							onAddReplay={this.onAddReplay}
							onDeleteReplay={this.onDeleteReplay}
						/>
					)}
					{data.length === 0 &&
					!loading && (
						<EmptyPlaceholder size={72}>
							<div className={styles['text']}>暂无留言</div>
						</EmptyPlaceholder>
					)}
				</div>
			</CustomScrollView>
		);
	}
}
