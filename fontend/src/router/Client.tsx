import React from 'react';
import { Provider } from 'ryan-redux';
import { store } from '../store';
import { BrowserRouter } from 'react-router-dom';
import { BaseRouter } from './BaseRouter';

export const HotApp = (
	<Provider store={store}>
		<BrowserRouter>
			<BaseRouter />
		</BrowserRouter>
	</Provider>
);
