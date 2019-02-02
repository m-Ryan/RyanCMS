import React from 'react';
import styles from './MonthList.module.scss';
import { Pagination } from 'antd';
import { User } from '../../../../../interface/user.interface';
import { EmptyPlaceholder } from '../../../../../components/EmptyPlaceholder/EmptyPlaceholder';
import { TextList } from '../../../components/TextList/TextList';
import { MonthList as IMonthList } from '../Record';
interface Props {
	data: IMonthList[];
	onPageChange: (page: number) => void;
	total: number;
	current: number;
	pageSize: number;
	blogger: User;
}
export function MonthList(props: Props) {
	const { data, onPageChange, total, current, pageSize, blogger } = props;
	return (
		<div className={styles['container']}>
			<h3 className={styles['title']}>归档（{total}）</h3>
			<div>
				{data.map((item, index) => (
					<div className={styles['month']} key={index}>
						<h3>{item.yearMonth}</h3>
						<TextList data={item.list} blogger={blogger} />
					</div>
				))}
			</div>
			<Pagination
				className={styles['pagination']}
				showQuickJumper
				current={current}
				pageSize={pageSize}
				total={total}
				hideOnSinglePage
				onChange={onPageChange}
			/>
		</div>
	);
}
