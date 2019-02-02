import React from 'react';
import { Route, Switch } from 'react-router-dom';
import BlogRouter from '../controller/blog/router/BlogRouter';
import UserRouter from '../controller/user/router/UserRouter';
import Login from '../controller/common/Login/Login';
import Register from '../controller/common/Register/Register';
import { NotFound } from '../controller/common/NotFound/NotFound';
import { NOT_FOUND_PAGE } from '../config/constant';
import '@/assets/style/public.scss';
import '@/assets/style/reset.scss';
import Welcome from '../controller/common/Home';
export const BaseRouter = (
	<Switch>
		<Route exact path="/" component={Welcome} />
		<Route path="/login" component={Login} />
		<Route path="/register" component={Register} />
		<Route path="/u/:id" component={BlogRouter} />
		<Route path="/admin" component={UserRouter} />
		<Route path={NOT_FOUND_PAGE} component={NotFound} />
		<Route component={NotFound} />
	</Switch>
);
