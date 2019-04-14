import React from 'react';
import styles from './List.module.scss';
import { User } from '@/interface/user.interface';
import { Article } from '@/interface/article.interface';
import { Icon } from 'antd';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';
import { routerModel } from '@/model';
interface Props {
	blogger: User;
	item: Article;
}
export function ListItem(props: Props) {
	const { blogger, item } = props;
	const prefixPath = routerModel.getPrefixPath();
	return (
		<li className={styles['list-item']}>
			<h3>
				<span className={styles['date']}>
					{dayjs(item.created_at * 1000).format('MMMM DD，YYYY')}
					&nbsp;/&nbsp;
					{<Icon type="tags" />}
					<span className={styles['category']}>{item.category.name}</span>
				</span>
			</h3>
			<h2 className={styles['title']}>{item.title}</h2>
			<div className={styles['summary']}>{item.summary}</div>
			<Link className={styles['btn']} to={prefixPath.replace(':id', blogger.nickname) + `/a/${item.title}`}>
				继续阅读
			</Link>
		</li>
	);
}
