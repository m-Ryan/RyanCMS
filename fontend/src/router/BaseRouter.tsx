import React from 'react';
import { Route, Switch } from 'react-router-dom';
import BlogRouter from '../controller/blog/router/BlogRouter';
import UserRouter from '../controller/user/router/UserRouter';
import Login from '../controller/common/Login/Login';
import Register from '../controller/common/Register/Register';
import { NotFound } from '../controller/common/NotFound/NotFound';
import '@/assets/style/public.scss';
import '@/assets/style/reset.scss';
import Welcome from '../controller/common/Home';
import DomainRouter from '../controller/blog/router/DomainRouter';
import { DOMAIN_PATH } from '@/controller/blog/router/blogRoutes';
export const BaseRouter = (
	<Switch>
		<Route exact path="/" component={Welcome} />
		<Route path="/login" component={Login} />
		<Route path="/register" component={Register} />
		<Route path="/u/:id" component={BlogRouter} />
		<Route path="/admin" component={UserRouter} />
		<Route path={DOMAIN_PATH} component={DomainRouter} />
		<Route path="*" component={NotFound} />
	</Switch>
);
