import React, { useEffect, useMemo } from 'react';
import { useBlogger } from '@/client/selector/useBlogger';
import { useQuery } from '@/client/hooks/useQuery';
import { useArticleList } from '@/client/selector/useArticleList';
import { useAppStore } from '@/client/modal/ryan-store';
import { List } from './components/List';
import { Skeleton } from 'antd';
import { useDocumentTitle } from '@/client/hooks/useDocumentTitle';

export function Home() {
  const { p: page = 1 } = useQuery();
  const { bloggerState } = useBlogger();
  const { articleListState, getList, getListLoading } = useArticleList();
  const { endSSR } = useAppStore();

  useDocumentTitle('首页');
  useEffect(() => {
    if (bloggerState && (articleListState.page !== page)) {
      getList({
        page,
        user_id: bloggerState.user_id,
      })
        .then(endSSR);
    } else {
      endSSR();
    }
  }, [bloggerState, page, endSSR, getList, articleListState]);

  const renderContent = useMemo(() => {
    if (getListLoading) {
      return <>
        <Skeleton active paragraph={{ rows: 3 }} />
        <Skeleton active paragraph={{ rows: 3 }} />
        <Skeleton active paragraph={{ rows: 3 }} />
        <Skeleton active paragraph={{ rows: 3 }} />
        <Skeleton active paragraph={{ rows: 3 }} />
      </>;
    }
    return <List data={articleListState} />;
  }, [articleListState, getListLoading]);

  return (
    <div>
      {renderContent}
    </div>
  );
}
