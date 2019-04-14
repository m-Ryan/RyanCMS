import * as React from 'react';
import * as styles from './CustomComment.module.scss';
import CommentHeader from './component/CommentHeader/CommentHeader';
import { User } from '../../interface/user.interface';
import { Message, Comment, Replay } from '../../interface/comment.interface';
import { ClearUnmountState } from '../../util/decorators/clearUnmountState';
import { catchError } from '../../util/decorators/catchError';
import { API } from '../../services/API';
import { ReactAutoBind } from '../../util/decorators/reactAutoBind';
import { loading } from '../../util/decorators/loading';
import CustomScrollView from '../CustomScrollView/CustomScrollView';
import { EmptyPlaceholder } from '../EmptyPlaceholder/EmptyPlaceholder';
import Floor from './component/Floor/Floor';
interface Props {
	user?: User;
	blogger: User;
	bloggerId?: number;
	articleId?: number;
	renderHeader?: React.ReactNode;
	className?: string;
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
				item.replays.push(replay);
			}
		});
		this.setState({
			data: [ ...data ]
		});
	}

	render() {
		const { user, renderHeader, className } = this.props;
		const { data, comment, loading, noMore, total } = this.state;
		return (
			<CustomScrollView
				show={!!comment}
				data={data}
				className={[ styles['scrollview'], className ].join(' ')}
				listClassName={styles['container']}
				loadMore={this.getCommentList}
				showLoading
				noMore={noMore}
				renderHeader={
					<React.Fragment>
						{renderHeader}
						{comment && (
							<CommentHeader commentId={comment.comment_id} user={user} postComment={this.postComment} />
						)}
					</React.Fragment>
				}
				renderItem={(item, index) => (
					<Floor
						key={item.message_id}
						floorNumber={total - index}
						data={item}
						user={user}
						onDelete={this.onDelete}
						onAdd={this.onAdd}
						onAddReplay={this.onAddReplay}
						onDeleteReplay={this.onDeleteReplay}
					/>
				)}
				empty={
					<EmptyPlaceholder size={72}>
						<div className={styles['text']}>暂无留言</div>
					</EmptyPlaceholder>
				}
				renderFooter={null}
			/>
		);
	}
}
