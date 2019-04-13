import React from 'react';
import { Route, Switch } from 'react-router-dom';
import BlogRouter from '../controller/blog/router/BlogRouter';
import UserRouter from '../controller/user/router/UserRouter';
import Login from '../controller/common/Login/Login';
import Register from '../controller/common/Register/Register';
import '@/assets/style/public.scss';
import '@/assets/style/reset.scss';
import Welcome from '../controller/common/Home';
import DomainRouter from '../controller/blog/router/DomainRouter';
import { connect } from 'ryan-redux';
import { routerModel } from '../model';
import { Location, History } from 'history';
interface Props {
	history: History;
	location: Location;
}
@connect(({ router }: { router: typeof routerModel.state }) => ({ router }))
export class BaseRouter extends React.Component<any> {
	componentDidMount() {
		console.log(this.props);
		routerModel.setRouter(this.props.location);
	}

	componentWillReceiveProps(nextProps: Props) {
		if (nextProps.location.pathname !== this.props.location.pathname) {
			routerModel.setRouter(nextProps.location);
		}
	}
	render() {
		const isExtraDomain = routerModel.getIsExtraDomain();
		return (
			<Switch>
				<Route path="/login" component={Login} />
				<Route path="/register" component={Register} />
				<Route path="/u/:id" component={BlogRouter} />
				<Route path="/admin" component={UserRouter} />
				<Route path="/" component={isExtraDomain ? DomainRouter : Welcome} />
			</Switch>
		);
	}
}
