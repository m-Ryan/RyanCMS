import React from 'react';
import { ClearUnmountState } from '../../../../util/decorators/clearUnmountState';
import { API } from '../../../../services/API';
import { catchError } from '../../../../util/decorators/catchError';
import { History, Location } from 'history';
import styles from './Record.module.scss';
import { Article } from '../../../../interface/article.interface';
import { User } from '../../../../interface/user.interface';
import dayjs from 'dayjs';
import { loading } from '../../../../util/decorators/loading';
import { CustomLoading } from '../../../../components/CustomLoading/CustomLoading';
import { UserContainer } from '../../components/UserContainer/UserContainer';
import { MonthList } from './MonthList/MonthList';
import { EmptyPlaceholder } from '../../../../components/EmptyPlaceholder/EmptyPlaceholder';
interface Props {
	history: History;
	location: Location;
	blogger: User;
	user?: User;
}

interface State {
	page: number;
	size: number;
	data: MonthList[];
	total: number;
	loading: boolean;
}

export interface MonthList {
	year: number;
	month: number;
	yearMonth: string;
	list: Article[];
}
@ClearUnmountState()
export default class Record extends React.PureComponent<Props, State> {
	state: State = {
		page: 1,
		size: 9999,
		data: [],
		total: 0,
		loading: false
	};

	async componentWillMount() {
		this.getArticleList();
	}

	@catchError()
	@loading()
	async getArticleList() {
		const { page, size } = this.state;
		const { blogger } = this.props;
		const result = await API.article.visitor.getList(page, size, blogger.user_id); // 拿到全部文章，不分页
		const data = this.groupByMonth(result.list);
		this.setState({
			data: data,
			total: result.count
		});
	}

	groupByMonth(data: Article[]) {
		const months = [] as MonthList[];
		data.sort((a, b) => b.created_at - a.created_at).forEach((item) => {
			const currentYear = dayjs(item.created_at * 1000).year();
			const currentMonth = dayjs(item.created_at * 1000).month() + 1;
			let month = months.filter((item) => item.month === currentMonth)[0];
			if (!month) {
				month = {
					year: currentYear,
					month: currentMonth,
					yearMonth: dayjs(item.created_at * 1000).format('YYYY年MM月'),
					list: []
				};
				months.push(month);
			}
			month.list.push(item);
		});
		return months;
	}

	onPageChange(page: number) {
		this.setState(
			{
				page
			},
			() => {
				this.getArticleList();
			}
		);
	}

	render() {
		const { data, total, page, size, loading } = this.state;
		const { blogger } = this.props;
		return (
			<UserContainer {...this.props}>
				<div className={styles['container']}>
					{!loading ? data.length ? (
						<MonthList
							total={total}
							current={page}
							pageSize={size}
							onPageChange={this.onPageChange}
							data={data}
							blogger={blogger}
						/>
					) : (
						<EmptyPlaceholder size={72}>
							<div style={{ fontSize: '14px' }}>暂无文章</div>
						</EmptyPlaceholder>
					) : (
						<CustomLoading />
					)}
				</div>
			</UserContainer>
		);
	}
}
