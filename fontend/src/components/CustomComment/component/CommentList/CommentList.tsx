import * as React from 'react';
import * as styles from './CommentList.module.scss';
import Floor from '../Floor/Floor';
import { User } from '../../../../interface/user.interface';
import { Message, Replay } from '../../../../interface/comment.interface';
import { EmptyPlaceholder } from '../../../EmptyPlaceholder/EmptyPlaceholder';
interface Props {
	user?: User;
	data: Message[];
	total: number;
	onDelete: (messageId: number) => any;
	onAdd: (message: Message) => any;
	onDeleteReplay: (replayId: number, messageId: number) => any;
	onAddReplay: (replay: Replay, messageId: number) => any;
}
export default function CommentList(props: Props) {
	const { user, data, onAdd, onDelete, onDeleteReplay, onAddReplay, total } = props;
	return (
		<div className={styles['container']}>
			{data.map((item, index) => (
				<Floor
					key={item.message_id}
					floorNumber={total - index}
					data={item}
					user={user}
					onDelete={onDelete}
					onAdd={onAdd}
					onDeleteReplay={onDeleteReplay}
					onAddReplay={onAddReplay}
				/>
			))}
		</div>
	);
}
