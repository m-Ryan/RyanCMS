import React, { useEffect, useMemo } from 'react';
import styles from './index.module.scss';
import { useBlogger } from '@/client/selector/useBlogger';
import { useAppStore } from '@/client/modal/ryan-store';
import { useRecordList } from '@/client/selector/useRecordList';
import { MonthListItem } from './MonthListItem';
import { Skeleton, Empty } from 'antd';
import { useDocumentTitle } from '@/client/hooks/useDocumentTitle';

export function Record() {
  const { bloggerState } = useBlogger();
  const {
    recordListState: { total, list },
    getList,
    getListLoading,
  } = useRecordList();
  const { endSSR } = useAppStore();

  useDocumentTitle('归档');
  useEffect(() => {
    if (bloggerState && !list.length) {
      getList({
        user_id: bloggerState.user_id,
      }).then(endSSR);
    }
  }, [bloggerState, endSSR, getList, list.length]);

  const renderContent = useMemo(() => {
    if (getListLoading) {
      return (
        <>
          <Skeleton active paragraph={{ rows: 1 }} />
          <Skeleton active paragraph={{ rows: 1 }} />
          <Skeleton active paragraph={{ rows: 1 }} />
          <Skeleton active paragraph={{ rows: 1 }} />
          <Skeleton active paragraph={{ rows: 1 }} />
          <Skeleton active paragraph={{ rows: 1 }} />
          <Skeleton active paragraph={{ rows: 1 }} />
          <Skeleton active paragraph={{ rows: 1 }} />
          <Skeleton active paragraph={{ rows: 1 }} />
        </>
      );
    }
    return list.map((item, index) => <MonthListItem key={index} data={item} />);
  }, [getListLoading, list]);

  if (list.length === 0) return <Empty className='empty' />;

  return (
    <div className={styles['container']}>
      <h3 className={styles['title']}>归档（{total}）</h3>
      <div>{renderContent}</div>
    </div>
  );
}
