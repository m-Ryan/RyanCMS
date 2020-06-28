import React  from 'react';
import { CommentItem } from '../CommentItem';
import styles from './index.module.scss';
import { Replay } from '@/client/types/comment.interface';

interface Props {
	data: Replay;
}

export function ReplayItem({ data }: Props) {
  return (
		<div className={styles['container']}>
		<CommentItem data={data} />
	</div>
  )
}