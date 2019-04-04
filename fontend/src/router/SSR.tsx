import React from 'react';
import { StaticRouter } from 'react-router';
import { Provider } from 'react-redux';
import { Store } from 'redux';
import { BaseRouter } from './BaseRouter';
export const SSR = (url: string, store: Store) => (
	<Provider store={store}>
		<StaticRouter context={{}} location={url}>
			{BaseRouter}
		</StaticRouter>
	</Provider>
);
