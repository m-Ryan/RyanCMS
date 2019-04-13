import React from 'react';
import { StaticRouter, Switch, Route } from 'react-router';
import { Provider } from 'ryan-redux';
import { Store } from 'redux';
import { BaseRouter } from './BaseRouter';
export const SSR = (url: string, store: Store) => (
	<Provider store={store}>
		<StaticRouter context={{}} location={url}>
			<Switch>
				<Route component={BaseRouter} />
			</Switch>
		</StaticRouter>
	</Provider>
);
