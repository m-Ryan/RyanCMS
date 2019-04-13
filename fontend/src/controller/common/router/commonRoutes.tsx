import React from 'react';
import Login from '../page/Login/Login';
import Register from '../page/Register/Register';
import Welcome from '../page/Home';
import { NotFound } from '../page/NotFound/NotFound';
export interface CommonRoutes {
	path: string;
	component: typeof React.Component;
	title: string;
	name?: string;
	icon?: string;
}
export const commonRoutes: CommonRoutes[] = [
	{
		path: '/',
		component: Welcome,
		title: '欢迎使用 RyanCMS 内容管理系统'
	},
	{
		path: '/login',
		component: Login,
		title: '登录'
	},
	{
		path: '/register',
		component: Register,
		title: '注册'
	},
	{
		path: '*',
		component: NotFound as any,
		title: '页面没找到'
	}
];
