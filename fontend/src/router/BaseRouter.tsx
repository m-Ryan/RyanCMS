import React from 'react';
import { Route, Switch } from 'react-router-dom';
import BlogRouter from '../controller/blog/router/BlogRouter';
import UserRouter from '../controller/user/router/UserRouter';
import '@/assets/style/public.scss';
import '@/assets/style/reset.scss';
import DomainRouter from '../controller/blog/router/DomainRouter';
import { connect } from 'ryan-redux';
import { routerModel, bloggersModel } from '../model';
import { Location, History } from 'history';
import CommonRouter from '../controller/common/router/commonRouter';
import { catchError } from '../util/decorators/catchError';
import { HOST } from '../config/constant';
interface Props {
	history: History;
	location: Location;
}
@connect(({ router }: { router: typeof routerModel.state }) => ({ router }))
export class BaseRouter extends React.Component<Props> {
	@catchError(function() {})
	async componentDidMount() {
		// 添加百度统计
		window._hmt.push([ '_trackPageview', this.props.location.pathname ]);
		// 判断是否是独立域名
		const hostname = window.location.hostname;
		if (hostname !== HOST.ENV_HOST_NAME && hostname !== HOST.PRODUCT_HOST_NAME) {
			const blogger = await bloggersModel.getByDomain(hostname);
			if (blogger) {
				routerModel.setRouter(this.props.location);
			}
		}
	}

	render() {
		const isExtraDomain = routerModel.getIsExtraDomain();
		return (
			<Switch>
				<Route path="/u/:id" component={BlogRouter} />
				<Route path="/admin" component={UserRouter} />
				<Route path="/" component={isExtraDomain ? DomainRouter : CommonRouter} />
			</Switch>
		);
	}
}
