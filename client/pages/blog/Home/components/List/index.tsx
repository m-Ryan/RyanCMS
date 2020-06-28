import React, { useMemo } from 'react';
import dayjs from 'dayjs';

import { TagOutlined } from '@ant-design/icons';
import { Link } from '@/client/components/Link';
import styles from './index.module.scss';
import { ArticleList } from '@/client/modal/articleList';
import { Pagination } from '@/client/components/Pagination';
import { Empty } from 'antd';

export function List({
  data,
}: {
  data: ArticleList;
}) {
  if (data.list.length === 0) return <Empty className="empty" />;
  return (
    <>
      <ul className={styles.list}>
        {data.list.map((item) => (
          <li key={item.article_id} className={styles['list-item']}>
            <h3>
              <span className={styles['date']}>
                {dayjs(item.created_at * 1000).format('MMMM DD，YYYY')}
                &nbsp;/&nbsp;
                <span className={styles['category']}><TagOutlined /> {item.category.name}</span>
              </span>
            </h3>
            <h2 className={styles['title']}>
              <Link type="blogger" to={`/a/${item.title}`}>{item.title}</Link>
            </h2>
            <div className={styles['summary']}>{item.summary}</div>
            <Link type="blogger" to={`/a/${item.title}`}>继续阅读 »</Link>
          </li>
        ))}
      </ul>
      <Pagination total={data.count} />
    </>
  );
}
