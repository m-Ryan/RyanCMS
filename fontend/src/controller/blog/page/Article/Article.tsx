import React from 'react';
import styles from './Article.module.scss';
import { User } from '@/interface/user.interface';
import { UserContainer } from '../../components/UserContainer/UserContainer';
import { ClearUnmountState } from '@/util/decorators/clearUnmountState';
import { ReactAutoBind } from '@/util/decorators/reactAutoBind';
import { API } from '@/services/API';
import { catchError } from '@/util/decorators/catchError';
import { Article as IArticle } from '@/interface/article.interface';
import { CustomLoading } from '@/components/CustomLoading/CustomLoading';
import { NOT_FOUND_PAGE } from '@/config/constant';
import { History, Location } from 'history';
import dayjs from 'dayjs';
import ReactMarkdown from 'react-markdown';
import LightCode from '@/components/LightCode/LightCode';
import CustomComment from '@/components/CustomComment/CustomComment';
import { checkRenderFromServer } from '@/util/decorators/checkRenderFromServer';
import { connect } from 'ryan-redux';
import { articleModel } from '../../../../model';
interface Props {
	history: History;
	location: Location;
	blogger: User;
	user?: User;
	articles: IArticle[];
}

interface State {
	loading: boolean;
}
interface ConnectProps {
	articles: IArticle[];
	bloggers: User[];
}

@connect(({ articles, bloggers }: ConnectProps) => ({ articles, bloggers }))
@ClearUnmountState()
@ReactAutoBind()
export default class Article extends React.Component<Props, State> {
	state: State = {
		loading: false
	};

	componentDidMount() {
		this.initData();
	}

	@catchError(function(this: Article) {
		this.props.history.push(NOT_FOUND_PAGE);
	})
	@checkRenderFromServer()
	async initData() {
		const { blogger } = this.props;
		const title = this.props.location.pathname.split('/a/')[1];
		await articleModel.getArticle({ userId: blogger.user_id, title: decodeURIComponent(title) });
	}

	static async initServerData(
		blogger: User,
		pathname: string
	): Promise<{
		articles: IArticle[];
	}> {
		const title = pathname.split('/a/')[1];
		const article = await API.article.visitor.getArticle({
			user_id: blogger.user_id,
			title: decodeURIComponent(title)
		});
		return {
			articles: [ article ]
		};
	}

	render() {
		const { user, articles, location, blogger } = this.props;
		const article = articles.filter((item) => item.title.trim() === location.pathname.split('/a/')[1])[0];
		return (
			<UserContainer {...this.props}>
				{article ? (
					<CustomComment
						articleId={article.article_id}
						blogger={blogger}
						user={user}
						className={styles['container']}
						renderHeader={
							<div>
								{blogger && article ? (
									<div className={styles['detail']}>
										<div className={styles['date']}>
											{dayjs(article.created_at * 1000).format('MMMM DD，YYYY')}
										</div>
										<h2 className={styles['title']}>{article.title}</h2>
										<ReactMarkdown
											className={`${styles['editor-view']} ry-table`}
											source={article.content.content}
											renderers={{ code: LightCode as any }}
											escapeHtml={false}
										/>
									</div>
								) : (
									<CustomLoading />
								)}
							</div>
						}
					/>
				) : (
					<div className={styles['container']}>
						<CustomLoading />
					</div>
				)}
			</UserContainer>
		);
	}
}
