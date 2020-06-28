import React, { useCallback } from 'react';
import { Pagination as APagination } from 'antd';
import { useQuery } from '@/client/hooks/useQuery';
import { useHistory } from 'react-router-dom';
import qs from 'qs';
import { LAYOUT_CONTAINER_ID } from '@/client/layouts/Blog';
import styles from './index.module.scss';

export function Pagination({ total, size = 10 }: { total: number, size?: number; }) {
  const { p: page = 1 } = useQuery();
  const history = useHistory();

  const onChange = useCallback((page: number, pageSize?: number | undefined) => {
    history.push({
      search: qs.stringify({
        ...qs.parse(location.search, { ignoreQueryPrefix: true }),
        p: page
      })
    });
    const ele = document.getElementById(LAYOUT_CONTAINER_ID);
    if (ele) {
      try {
        ele.scrollTo({
          top: 0, behavior: 'smooth'
        });
      } catch (error) {
        ele.scrollTo(0, 0);
      }
    }

  }, [history]);

  return <div className={styles.pagination}><APagination onChange={onChange} current={Number(page)} total={total} pageSize={size} hideOnSinglePage showSizeChanger={false} /></div>;
}