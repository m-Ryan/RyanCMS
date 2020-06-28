import React from 'react';
import { CommentItem } from '../CommentItem';
import styles from './index.module.scss';
import { Message } from '@/client/types/comment.interface';
import { ReplayItem } from '../ReplayItem';

interface Props {
	data: Message;
	floorNumber: number;
}

export function FloorItem({ floorNumber, data }: Props) {
  return (
    <div className={styles['container']}>
				<CommentItem
					floorNumber={floorNumber}
					data={data}
				/>
				<div className={styles['replays']}>
					{data.replays.map((item) => (
						<ReplayItem
							key={item.replay_id}
							data={item}
						/>
					))}
				</div>
			</div>
  )
}