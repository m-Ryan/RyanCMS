import React, { useState, useCallback, useMemo } from 'react';
import { Button, message, Popconfirm, Input } from 'antd';
import dayjs from 'dayjs';
import { useUser } from '@/client/selector/useUser';
import { Message, Replay } from '@/client/types/comment.interface';

import styles from './index.module.scss';
import { useAppDispatch } from '@/client/modal/ryan-store';
import { comment } from '@/client/modal/comment';
import { useCommentInput } from '../useCommentInput';

interface Props {
	data: Message | Replay;
	floorNumber?: number;
}

export const isReplay = (
	data: Message | Replay
): data is Replay => !!(data as Replay).replay_id;


export function CommentItem(props: Props) {
	const { data, floorNumber } = props;
	const { userState } = useUser();
	const dispatch = useAppDispatch();
	const isEditor = userState && userState.user_id === data.user.user_id;

	const { renderInput, open, visible } = useCommentInput({ type: 'replay', message_id: data.message_id });

	const onDelete = useCallback(async () => {
		if (isReplay(data)) {
			await dispatch(comment.effects.deleteReplay)({
				message_id: data.message_id,
				replay_id: data.replay_id
			});
		} else {
			await dispatch(comment.effects.deleteMessage)({
				message_id: data.message_id
			});
		}
		message.success('删除成功');
	}, [data, dispatch]);


	const onInputToggle = useCallback(() => {
		if (!userState) {
			message.warning('请先登录');
			return;
		}
		open()
	}, [open, userState]);

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
				{data.content}
				<div className={styles['replay-btn']}>
					{isEditor ? (
						<Popconfirm title="你确定要删除吗？" okText="确定" cancelText="取消" onConfirm={onDelete}>
							<Button size="small" type="primary">
								删除
								</Button>
						</Popconfirm>
					) : (
							!visible && <Button size="small" type="primary" onClick={onInputToggle}>
								回复
							</Button>
						)}
				</div>
			</div>
			{renderInput}
		</div>
	);
}