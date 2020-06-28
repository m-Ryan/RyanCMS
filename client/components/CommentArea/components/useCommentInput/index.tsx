import React, { useState, useCallback, useMemo } from 'react';
import { Button, message, Popconfirm, Input } from 'antd';
import { useUser } from '@/client/selector/useUser';
import { useEffectLoading, useAppDispatch } from '@/client/modal/ryan-store';
import { WhiteSpace } from '@/client/components/WhiteSpace';
import { comment } from '@/client/modal/comment';
import styles from './index.module.scss';
import { isServer } from '@/client/utils/tools';

interface Props {
	type: 'comment' | 'replay';
	comment_id?: number;
	message_id?: number;
}
export function useCommentInput({ type, message_id = 0, comment_id = 0 }: Props) {
	const [visible, setVisible] = useState(false);
	const { userState } = useUser();
	const [content, setContent] = useState('');
	const dispatch = useAppDispatch();

	const replayLoading = useEffectLoading()(comment.effects.replay);
	const commentLoading = useEffectLoading()(comment.effects.postComment);

	const loading = useMemo(() => {
		if (type === 'comment') return commentLoading;
		return replayLoading;
	}, [commentLoading, replayLoading, type]);

	const onSubmit = useCallback(async () => {
		if (type === 'comment') {
			await dispatch(comment.effects.postComment)({
				content,
				comment_id
			});
			message.success('评论成功');
		} else {
			await dispatch(comment.effects.replay)({
				content,
				message_id
			});
			message.success('回复成功');
		}
		setContent('');
		setVisible(false);
	}, [comment_id, content, dispatch, message_id, type]);

	const onInputToggle = useCallback(() => {
		if (!userState) {
			message.warning('请先登录');
			return;
		}
		setVisible((v => !v));
	}, [userState]);

	const renderInput = useMemo(() => {
		if (isServer()) return null;
		return (
			<div className={styles['editor']} style={{ maxHeight: visible ? 300 : 0 }}>
				<Input.TextArea value={content} onChange={(e) => setContent(e.target.value)} autoSize={{ minRows: 4, maxRows: 4 }} placeholder='发表留言' />
				<div className={styles['submit-btn']}>
					<Button type="primary" ghost onClick={onInputToggle}>
						取消
					</Button>
					<WhiteSpace space={2} />
					<Button loading={loading} type="primary" disabled={!content} onClick={onSubmit}>
						确定
					</Button>
				</div>
			</div>
		);
	}, [content, loading, onInputToggle, onSubmit, visible]);


	return {
		renderInput,
		visible,
		open: () => setVisible(true)
	};
}