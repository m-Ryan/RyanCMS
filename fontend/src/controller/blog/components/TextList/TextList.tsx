import React from 'react';
import styles from './TextList.module.scss';
import { Link } from 'react-router-dom';
import { Article } from '../../../../interface/article.interface';
import dayjs from 'dayjs';
import { User } from '../../../../interface/user.interface';
import { EmptyPlaceholder } from '../../../../components/EmptyPlaceholder/EmptyPlaceholder';
interface Props {
	data: Article[];
	blogger: User;
}
export function TextList(props: Props) {
	const { data, blogger } = props;
	return (
		<React.Fragment>
			{data.length > 0 ? (
				<ul className={styles['container']}>
					{data.map((item) => (
						<li className={styles['list-item']} key={item.article_id}>
							<Link to={`/u/${blogger.nickname}/a/${item.title}`}>
								<h3>
									{item.title}
									&nbsp;
									<span className={styles['date']}>
										{dayjs(item.created_at * 1000).format('YYYY-MM-DD')}
									</span>
								</h3>
							</Link>
						</li>
					))}
				</ul>
			) : (
				<EmptyPlaceholder size={72} />
			)}
		</React.Fragment>
	);
}
