import React, { useEffect } from 'react';
import styles from './index.module.scss';
import { useQuery } from '@/client/hooks/useQuery';
import { useHistory, useLocation } from 'react-router-dom';
import qs from 'qs';

export default function Error() {
  const {
    message = 'Not Found',
    code = '404',
    expect = '/',
    reload = false,
  } = useQuery();
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    if (reload) {
      history.replace(expect);
    } else {
      history.replace({
        search: qs.stringify(
          {
            ...qs.parse(location.search, { ignoreQueryPrefix: true }),
            reload: true,
          },
          {
            addQueryPrefix: true,
          }
        ),
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles['container']}>
      <div className={styles['center']}>
        <div className={styles['text']}>
          <h1>{code}</h1>
          <h2>{message}</h2>
        </div>
      </div>
      <div className={styles['footer']}>
        <br />
        <p>© 2019 - 01 - RyanCMS -</p>
        <p>
          <span className={styles['hitokoto']}>
            离别并不痛苦，因为我们都微笑着。
          </span>
        </p>
      </div>
    </div>
  );
}
