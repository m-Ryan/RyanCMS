import React, { useEffect } from 'react';
import { useArticle } from '@/client/selector/useArticle';
import styles from './index.module.scss';
import dayjs from 'dayjs';
import { useAppDispatch, useAppStore } from '@/client/modal/ryan-store';
import { useBlogger } from '@/client/selector/useBlogger';
import { useParams } from 'react-router-dom';
import { Skeleton } from 'antd';
import { CommentArea } from '@/client/components/CommentArea';
import { WhiteSpace } from '@/client/components/WhiteSpace';
import { useDocumentTitle } from '@/client/hooks/useDocumentTitle';
import { useMetaDescription } from '@/client/hooks/useMetaDescription';
import { useMarkdownRender } from '@/client/hooks/useMarkdownRender';

export function Article() {
  const { markdownRender } = useMarkdownRender();
  const { articleState, getArticle, getArticleLoading } = useArticle();
  const { bloggerState } = useBlogger();
  const { title = '' } = useParams<{ title: string }>();
  const dispatch = useAppDispatch();
  const { endSSR } = useAppStore();
  useDocumentTitle(title);
  const { setDescription } = useMetaDescription('');

  useEffect(() => {
    if (bloggerState) {
      if (articleState && articleState.title === title) {
        endSSR();
      } else {
        getArticle({
          title,
          user_id: bloggerState.user_id,
        }).then(endSSR);
      }
    }
  }, [articleState, bloggerState, dispatch, endSSR, getArticle, title]);

  useEffect(() => {
    if (articleState) {
      setDescription(articleState.summary);
    }
  }, [articleState, setDescription]);

  if (getArticleLoading) {
    return (
      <div className={styles['detail']}>
        <div className={styles['date']}>
          <WhiteSpace />
        </div>
        <h1 className={styles.title}>{title}</h1>
        <div className={styles.conntent}>
          <Skeleton active paragraph={{ rows: 15 }} />
        </div>
      </div>
    );
  }

  if (!articleState) return null;

  return (
    <div className={styles['detail']}>
      <div className={styles['date']}>
        {dayjs(articleState.created_at * 1000).format('MMMM DD，YYYY')}
      </div>
      <h1 className={styles.title}>{articleState.title}</h1>
      <div
        className={styles.conntent}
        dangerouslySetInnerHTML={{
          __html: markdownRender.render(articleState.content.content),
        }}
      ></div>
      <CommentArea article_id={articleState.article_id} />
    </div>
  );
}
