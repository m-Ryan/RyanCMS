import React from 'react';
import { Route, Switch } from 'react-router';
import { blogRoutes } from './blogRoutes';
import { User } from '@/interface/user.interface';
import { API } from '@/services/API';
import { connect } from 'react-redux';
import { CustomerPageLoading } from '@/components/CustomerPageLoading/CustomerPageLoading';
import { catchError } from '@/util/decorators/catchError';
import { comparePath } from '@/util/util';
import TokenStorage from '@/util/TokenStorage';
import { History } from 'history';
import { NOT_FOUND_PAGE } from '@/config/constant';
import { ServerData } from '@/interface/serverData.interface';
import bloggersModel from '@/model/bloggers';
import userModel from '../../../model/user';
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

@connect(({ bloggers, user }: ConnectProps) => ({ bloggers, user }))
export default class BlogRouter extends React.PureComponent<Props> {
	componentDidMount() {
		if (!this.getBlogger()) {
			this.initData();
		}
		if (TokenStorage.getToken()) {
			this.getUser();
		}
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

	static async initServerData(pathname: string): Promise<ServerData> {
		const nickname = pathname.split('/')[2];
		const blogger = await API.user.visitor.getByName(nickname);
		const page = blogRoutes.filter((item) => comparePath(pathname, item.path))[0];
		const initServerData = (page.component as any).initServerData;
		const pageState = typeof initServerData === 'function' ? await initServerData(blogger, pathname) : {};
		return {
			title: typeof page.title === 'function' ? page.title(pathname) : page.title,
			props: {
				bloggers: [ blogger ],
				...pageState
			}
		};
	}

	componentWillReceiveProps(nextProps: Props) {
		if (nextProps.location.pathname !== this.props.location.pathname) {
			const page = blogRoutes.filter((item) => comparePath(nextProps.location.pathname, item.path))[0];
			document.title = typeof page.title === 'function' ? page.title(nextProps.location.pathname) : page.title;
		}
	}

	getBlogger() {
		const { bloggers, location } = this.props;
		const nickname = location.pathname.split('/')[2];
		return bloggers.filter((item) => item.nickname === nickname)[0];
	}

	render() {
		const blogger = this.getBlogger();
		return (
			<React.Fragment>
				{blogger ? (
					<Switch>
						{blogRoutes.map((route, index) => (
							<Route
								key={index}
								exact={true}
								path={route.path}
								component={() => <route.component blogger={blogger} {...this.props} />}
							/>
						))}
					</Switch>
				) : (
					<CustomerPageLoading />
				)}
			</React.Fragment>
		);
	}
}
