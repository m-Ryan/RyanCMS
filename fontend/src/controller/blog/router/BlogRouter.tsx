import React from 'react';
import { Route, Switch } from 'react-router';
import { blogRoutes, BASE_PATH } from './blogRoutes';
import { API } from '@/services/API';
import { connect } from 'ryan-redux';
import { catchError } from '@/util/decorators/catchError';
import { comparePath, awaitCssColorOnLoad } from '@/util/util';
import TokenStorage from '@/util/TokenStorage';
import { History, Location } from 'history';
import { NOT_FOUND_PAGE } from '@/config/constant';
import { ServerData } from '@/interface/serverData.interface';
import { bloggersModel, userModel, themeModel, routerModel } from '@/model';
import { User } from '@/interface/user.interface';
import { checkRenderFromServer } from '../../../util/decorators/checkRenderFromServer';
interface Props {
	history: History;
	location: Location;
	bloggers: User[];
	user?: User;
}
interface ConnectProps {
	bloggers: User[];
	user: User;
}

interface State {
	initThemeColor: boolean;
}

@connect(({ bloggers, user }: ConnectProps) => ({ bloggers, user }))
export default class BlogRouter extends React.PureComponent<Props, State> {
	state: State = {
		initThemeColor: false
	};

	constructor(props: Props) {
		super(props);
	}

	@catchError()
	async componentDidMount() {
		if (!this.getBlogger()) {
			await this.initData();
		}
		if (TokenStorage.getToken()) {
			this.getUser();
		}
		this.initTheme();
	}

	@catchError(function(this: BlogRouter) {
		this.props.history.push(NOT_FOUND_PAGE);
	})
	async initData() {
		const nickname = this.props.location.pathname.split('/')[2];
		await bloggersModel.getByName(nickname);

		if (TokenStorage.getToken()) {
			this.getUser();
		}
	}

	@catchError(TokenStorage.clearToken)
	async getUser() {
		await userModel.getUser();
	}

	async initTheme() {
		const isFromServer = routerModel.getIsFromServer();
		if (isFromServer) return;
		await awaitCssColorOnLoad();
		const blogger = this.getBlogger();
		if (blogger) {
			const color = blogger.theme.color;
			if (color) {
				await themeModel.saveThemeColor([
					{
						name: 'primary',
						color
					}
				]);
			}
		}
		this.setState({ initThemeColor: true });
	}

	static async initServerData(pathname: string): Promise<ServerData> {
		const page = blogRoutes.filter((item) => comparePath(pathname, BASE_PATH + item.path))[0];
		if (!page) {
			return {
				title: '页面出错',
				props: {}
			};
		}
		const nickname = pathname.split('/')[2];
		const blogger = await API.user.visitor.getBaseUser({ nickname });

		const initServerData = (page.component as any).initServerData;
		const pageState = typeof initServerData === 'function' ? await initServerData(blogger, pathname) : {};
		return {
			title: typeof page.title === 'function' ? page.title(pathname, blogger.nickname) : page.title,
			props: {
				router: {
					location: null,
					isExtraDomain: false,
					renderFromServer: true
				},
				bloggers: [ blogger ],
				...pageState
			}
		};
	}

	componentWillReceiveProps(nextProps: Props) {
		if (nextProps.location.pathname !== this.props.location.pathname) {
			const blogger = this.getBlogger();
			if (!blogger) return;
			const page = blogRoutes.filter((item) =>
				comparePath(nextProps.location.pathname, BASE_PATH + item.path)
			)[0];
			document.title =
				typeof page.title === 'function'
					? page.title(decodeURIComponent(nextProps.location.pathname), blogger.nickname)
					: decodeURIComponent(page.title);
		}
	}

	getBlogger() {
		const { bloggers, location } = this.props;
		const nickname = location.pathname.split('/')[2];
		return bloggers.filter((item) => item.nickname === nickname)[0];
	}

	render() {
		const blogger = this.getBlogger();
		const { initThemeColor } = this.state;
		const isFromServer = routerModel.getIsFromServer();
		return (
			<React.Fragment>
				{blogger && (
					<Switch>
						{blogRoutes.map((route, index) => (
							<Route
								key={index}
								exact={true}
								path={BASE_PATH + route.path}
								component={() => <route.component blogger={blogger} {...this.props} />}
							/>
						))}
					</Switch>
				)}
			</React.Fragment>
		);
	}
}
