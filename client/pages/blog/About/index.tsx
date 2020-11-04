import React, { useEffect } from 'react';
import styles from './index.module.scss';
import { useAppStore } from '@/client/modal/ryan-store';
import { useBlogger } from '@/client/selector/useBlogger';
import { Skeleton } from 'antd';
import { CommentArea } from '@/client/components/CommentArea';
import { useResume } from '@/client/selector/useResume';
import { useDocumentTitle } from '@/client/hooks/useDocumentTitle';
import { useMarkdownRender } from '@/client/hooks/useMarkdownRender';

export function About() {
  useDocumentTitle('关于');
  const { markdownRender } = useMarkdownRender();
  const { resumeState, getResume, getResumeLoading } = useResume();
  const { bloggerState } = useBlogger();
  const { endSSR } = useAppStore();

  useEffect(() => {
    if (bloggerState) {
      getResume({
        user_id: bloggerState.user_id,
      }).then(endSSR);
    }
  }, [bloggerState, endSSR, getResume]);

  if (!resumeState && getResumeLoading) {
    return (
      <div className={styles['detail']}>
        <div className={styles.conntent}>
          <Skeleton active paragraph={{ rows: 15 }} />
        </div>
      </div>
    );
  }

  if (!resumeState) return null;

  return (
    <div className={styles['detail']}>
      <div
        className={styles.conntent}
        dangerouslySetInnerHTML={{
          __html: markdownRender.render(resumeState.content),
        }}
      ></div>
      <CommentArea blogger_id={resumeState.user_id} />
    </div>
  );
}
