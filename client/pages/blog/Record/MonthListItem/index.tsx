import React from 'react';
import styles from './index.module.scss';
import { MonthList } from '@/client/modal/recordList';
import { Link } from '@/client/components/Link';
import dayjs from 'dayjs';

export function MonthListItem({ data }: { data: MonthList; }) {
	return (
		<div className={styles['month']}>
			<h3>{data.yearMonth}</h3>
			<ul className={styles['list']}>
				{data.list.map((item) => (
					<li className={styles['list-item']} key={item.article_id}>
						<Link type="blogger" to={`/a/${item.title}`}>
							<h3>
								<span className={styles['title']}>{item.title}</span>
								<span className={styles['date']}>
									{dayjs(item.created_at * 1000).format('YYYY-MM-DD')}
								</span>
							</h3>
						</Link>
					</li>
				))}
			</ul>
		</div>
	);
}
