import React from 'react';
import styles from './Home.module.scss';
import { User } from '@/interface/user.interface';
import { List } from './components/LIst/List';
import { UserContainer } from '../../components/UserContainer/UserContainer';
import { ClearUnmountState } from '@/util/decorators/clearUnmountState';
import { ReactAutoBind } from '@/util/decorators/reactAutoBind';
import { catchError } from '@/util/decorators/catchError';
import { loading } from '@/util/decorators/loading';
import CustomScrollView from '@/components/CustomScrollView/CustomScrollView';
import { CustomLoading } from '@/components/CustomLoading/CustomLoading';
import { History, Location } from 'history';
import { Condition } from '@/components/Condition';
import { connect } from 'react-redux';
import { checkRenderFromServer } from '@/util/decorators/checkRenderFromServer';
import { IArticleList } from '@/model/articleList';
import { API } from '@/services/API';
import { EmptyPlaceholder } from '@/components/EmptyPlaceholder/EmptyPlaceholder';
import { articleListModel } from '@/model';

interface Props {
	history: History;
	location: Location;
	blogger: User;
	articleList: IArticleList;
	user?: User;
}

interface State {
	loading: boolean;
}
interface ConnectProps {
	articleList: IArticleList;
}

@connect(({ articleList }: ConnectProps) => ({ articleList }))
@ClearUnmountState()
@ReactAutoBind()
export default class Home extends React.PureComponent<Props, State> {
	state: State = {
		loading: false
	};

	componentDidMount() {
		this.initData();
	}

	@checkRenderFromServer()
	async initData() {
		this.getArticleList();
	}

	static async initServerData(
		blogger: User,
		pathname: string
	): Promise<{
		articleList: typeof articleListModel['state'];
	}> {
		const page = 1;
		const size = 10;
		const articleResult = await API.article.visitor.getList(page, size, blogger.user_id);
		return {
			articleList: {
				page,
				size,
				noMore: articleResult.count <= size,
				list: articleResult.list,
				count: articleResult.count
			}
		};
	}

	@catchError()
	@loading()
	async getArticleList() {
		const { blogger } = this.props;
		await articleListModel.getList(blogger.user_id);
	}

	render() {
		const { blogger, articleList } = this.props;
		const { list, noMore, count } = articleList;
		const { loading } = this.state;
		return (
			<UserContainer {...this.props}>
				<Condition show={count > 0}>
					<CustomScrollView
						className={`${styles['container']} reset-page`}
						loadMore={this.getArticleList}
						showLoading
						noMore={noMore}
					>
						<List list={list} blogger={blogger} />
					</CustomScrollView>
				</Condition>
				<Condition show={!loading && count === 0}>
					<div className={`${styles['container']}`}>
						<EmptyPlaceholder size={72}>
							<p>暂无数据</p>
						</EmptyPlaceholder>
					</div>
				</Condition>
				<Condition show={loading && count === 0}>
					<div className={styles['container']}>
						<CustomLoading />
					</div>
				</Condition>
			</UserContainer>
		);
	}
}
