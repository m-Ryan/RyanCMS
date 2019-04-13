import React from 'react';
import { commonRoutes } from './commonRoutes';
import { Switch, Route } from 'react-router';
export default class CommonRouter extends React.Component {
	render() {
		return (
			<Switch>
				{commonRoutes.map((route, index) => (
					<Route
						key={index}
						exact={true}
						path={route.path}
						component={() => <route.component {...this.props} />}
					/>
				))}
			</Switch>
		);
	}
}
