import React, { useMemo, useEffect, useCallback } from 'react';
import styles from './index.module.scss';
import { Button, message } from 'antd';
import { Link } from '../Link';
import { useUser } from '@/client/selector/useUser';
import { WhiteSpace } from '../WhiteSpace';
import { useAppDispatch } from '@/client/modal/ryan-store';
import { comment } from '@/client/modal/comment';
import { useComment } from '@/client/selector/useComment';
import { FloorItem } from './components/FloorItem';
import { useCommentInput } from './components/useCommentInput';

type CommentProps = {
  blogger_id?: number;
  article_id?: number;
};

export function CommentArea({ blogger_id, article_id }: CommentProps) {
  const { userState } = useUser();
  const { commentState } = useComment();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(comment.effects.initComment)(blogger_id ? { blogger_id } : { article_id });
  }, [article_id, blogger_id, dispatch]);

  const { renderInput, open, visible } = useCommentInput({ type: 'comment', comment_id: commentState.comment ? commentState.comment.comment_id : 0 });

  const onInputToggle = useCallback(() => {
		if (!userState) {
			message.warning('请先登录');
			return;
		}
		open()
	}, [open, userState]);

  const renderHeaderBtns = useMemo(() => {
    if (userState) {
      return (
        <div>
          <Button onClick={onInputToggle} type="primary">
            留言
					</Button>
        </div>
      );
    }
    return <div>
      <Button>
        <Link to="/login">登录</Link>
      </Button>
      <WhiteSpace space={2} />
      <Button type="primary">注册</Button>
    </div>;
  }, [onInputToggle, userState]);

  const { list, total } = commentState;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div><WhiteSpace /></div>
        <h2>留言区</h2>
        {renderHeaderBtns}
      </div>
      {renderInput}
      <div className={styles.content}>
        {
          list.map((item, index) => (<FloorItem key={item.message_id} data={item} floorNumber={total - index} />))
        }
      </div>
    </div>
  );
}