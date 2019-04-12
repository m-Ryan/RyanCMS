import React from 'react';
import { ClearUnmountState } from '../../../../util/decorators/clearUnmountState';
import { API } from '../../../../services/API';
import { catchError } from '../../../../util/decorators/catchError';
import { History, Location } from 'history';
import styles from './TagArticle.module.scss';
import { Article } from '../../../../interface/article.interface';
import { User } from '../../../../interface/user.interface';
import { Tag } from '../../../../interface/tag.interface';
import { TextList } from '../../components/TextList/TextList';
import { loading } from '../../../../util/decorators/loading';
import { CustomLoading } from '../../../../components/CustomLoading/CustomLoading';
import { UserContainer } from '../../components/UserContainer/UserContainer';
interface Props {
	history: History;
	location: Location;
	blogger: User;
	user: User;
}

interface State {
	tag: Tag | null;
	page: number;
	size: number;
	data: Article[];
	total: number;
	loading: boolean;
}

export interface MonthList {
	year: number;
	month: number;
	list: Article[];
}
@ClearUnmountState()
export default class TagArticle extends React.PureComponent<Props, State> {
	state: State = {
		tag: null,
		page: 1,
		size: 9999,
		total: 0,
		data: [],
		loading: true
	};

	async componentWillMount() {
		await this.getTag();
		this.getArticleList();
	}

	@catchError()
	async getTag() {
		const { blogger, location } = this.props;
		const tagName = location.pathname.split('/t/')[1];
		const result = await API.tag.visitor.getTag(blogger.user_id, tagName);
		return new Promise((resolve) =>
			this.setState(
				{
					tag: result
				},
				resolve
			)
		);
	}

	@catchError()
	@loading()
	async getArticleList() {
		const { page, size, tag } = this.state;
		if (!tag) {
			return;
		}
		const { blogger } = this.props;
		const result = await API.article.visitor.getList(page, size, blogger.user_id, undefined, tag.tag_id); // 拿到全部文章，不分页
		this.setState({
			data: result.list,
			total: result.count
		});
	}

	render() {
		const { data, loading } = this.state;
		const { blogger } = this.props;
		return (
			<UserContainer {...this.props}>
				<div className={styles['container']}>
					{!loading ? <TextList data={data} blogger={blogger} /> : <CustomLoading />}
				</div>
			</UserContainer>
		);
	}
}
