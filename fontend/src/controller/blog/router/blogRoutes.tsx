import React from 'react';
import Home from '../page/Home/Home';
import Record from '../page/Record/Record';
import Tag from '../page/Tag/Tag';
import About from '../page/About/About';
import Article from '../page/Article/Article';
import TagArticle from '../page/TagArticle/TagArticle';
import PageNotFound from '../page/NotFound/NotFound';

interface RouterProps {
	location: {
		pathname: string;
	};
}

interface BlogRoutes {
	path: string;
	component: typeof React.Component;
	title: (pathname: string) => string | string;
	exact?: boolean;
	name?: string;
	icon?: string;
}
const setBlogName = (pageName: string, pathname: string) => `${pageName} | ` + pathname.split('/')[2] + '的小站';
export const blogRoutes: BlogRoutes[] = [
	{
		path: '/u/:id',
		component: Home,
		title: (pathname: string) => setBlogName('主页', pathname),
		name: '主页',
		icon: 'home'
	},
	{
		path: '/u/:id/record',
		component: Record,
		title: (pathname: string) => setBlogName('归档', pathname),
		name: '归档',
		icon: 'bars'
	},
	{
		path: '/u/:id/tag',
		component: Tag,
		title: (pathname: string) => setBlogName('标签', pathname),
		name: '标签',
		icon: 'tags'
	},
	{
		path: '/u/:id/about',
		component: About,
		title: (pathname: string) => setBlogName('关于', pathname),
		name: '关于',
		icon: 'robot'
	},
	{
		path: '/u/:id/a/:id',
		component: Article,
		title: (pathname: string) => setBlogName(pathname.split('/a/')[1], pathname)
	},
	{
		path: '/u/:id/t/:id',
		component: TagArticle,
		title: (pathname: string) => setBlogName(pathname.split('/t/')[1], pathname)
	},
	{
		path: '*',
		component: PageNotFound,
		title: (pathname: string) => setBlogName(pathname.split('/t/')[1], pathname)
	}
];
