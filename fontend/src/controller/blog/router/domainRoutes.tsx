import React from 'react';

import Login from '../../common/page/Login/Login';
import Register from '../../common/page/Register/Register';
import UserRouter from '../../user/router/UserRouter';
import { blogRoutes } from './blogRoutes';

interface BlogRoutes {
	path: string;
	component: typeof React.Component;
	title: (pathname: string, nickname: string) => string | string;
	exact?: boolean;
	name?: string;
	icon?: string;
}
export const DOMAIN_PATH = '';
const setBlogName = (pageName: string, nickname: string) => `${pageName} | ` + nickname + '的小站';
export const domainRoutes: BlogRoutes[] = [
	{
		path: '/admin',
		component: UserRouter,
		title: (pathname: string, nickname: string) => setBlogName('管理后台', nickname)
	},
	{
		path: '/admin/*',
		component: UserRouter,
		title: (pathname: string, nickname: string) => setBlogName('管理后台', nickname)
	},
	{
		path: '/login',
		component: Login,
		title: (pathname: string, nickname: string) => setBlogName('登录', nickname)
	},
	{
		path: '/register',
		component: Register,
		title: (pathname: string, nickname: string) => setBlogName('注册', nickname)
	},
	...blogRoutes
];
