import services from '../services';
import { Article } from '../types/article.interface';
import { NumberString } from '../types/NumberString.interface';
import { ListResponse } from '../types/response/list.response';
import dayjs from 'dayjs';
export type RecordList = {
	list:  MonthList[],
	total: number;
}

export interface MonthList {
	year: number;
	month: number;
	yearMonth: string;
	list: Article[];
}

export const recordList = {
	state: {
		list: [],
		total: 0,
	} as RecordList,
	reducers: {},
	effects: {
		async getList(
			state: {
				list:  MonthList[],
				total: number;
			},
			payload: {
				user_id: number;
			},
		) {
			const months = [] as MonthList[];
			const { list, count } = await services.article.visitor.getList({
				page: 1,
				size: 9999,
				user_id: payload.user_id
			});
			list.sort((a, b) => b.created_at - a.created_at).forEach((item) => {
				const currentYear = dayjs(item.created_at * 1000).year();
				const currentMonth = dayjs(item.created_at * 1000).month() + 1;
				let month = months.filter((item) => item.month === currentMonth && item.year === currentYear)[0];
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

			return {
				list: months,
				total: count
			};
		},
	},
};
