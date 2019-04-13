import React from 'react';
import { Route, Switch, RouterProps } from 'react-router';
import { blogRoutes, DOMAIN_PATH } from './blogRoutes';
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
	inited: boolean;
}

@connect(({ bloggers, user }: ConnectProps) => ({ bloggers, user }))
export default class DomainRouter extends React.PureComponent<Props, State> {
	state: State = {
		inited: false
	};
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

	@catchError(function(this: DomainRouter) {
		this.props.history.push(NOT_FOUND_PAGE);
	})
	async initData() {
		const domain = window.location.hostname;
		await bloggersModel.getByDomain(domain);

		if (TokenStorage.getToken()) {
			this.getUser();
		}
	}

	@catchError(TokenStorage.clearToken)
	async getUser() {
		await userModel.getUser();
	}

	async initTheme() {
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
		this.setState({ inited: true });
	}

	static async initServerData(pathname: string, domain: string): Promise<ServerData> {
		const page = blogRoutes.filter((item) => comparePath(pathname, DOMAIN_PATH + item.path))[0];
		const blogger = await API.user.visitor.getBaseUser({ domain });
		const initServerData = (page.component as any).initServerData;
		const pageState = typeof initServerData === 'function' ? await initServerData(blogger, pathname) : {};
		return {
			title: typeof page.title === 'function' ? page.title(pathname, blogger.nickname) : page.title,
			props: {
				router: {
					location: null,
					isExtraDomain: true
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
				comparePath(nextProps.location.pathname, DOMAIN_PATH + item.path)
			)[0];

			document.title =
				typeof page.title === 'function'
					? page.title(nextProps.location.pathname, blogger.nickname)
					: page.title;
		}
	}

	getBlogger() {
		return bloggersModel.getCurrentBlogger();
	}

	render() {
		const blogger = this.getBlogger();
		const { inited } = this.state;
		return (
			<React.Fragment>
				{blogger &&
				inited && (
					<Switch>
						{blogRoutes.map((route, index) => (
							<Route
								key={index}
								exact={true}
								path={DOMAIN_PATH + route.path}
								component={() => <route.component blogger={blogger} {...this.props} />}
							/>
						))}
					</Switch>
				)}
			</React.Fragment>
		);
	}
}
