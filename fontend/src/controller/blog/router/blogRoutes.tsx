import React from 'react';
import Home from '../page/Home/Home';
import Record from '../page/Record/Record';
import Tag from '../page/Tag/Tag';
import About from '../page/About/About';
import Article from '../page/Article/Article';
import TagArticle from '../page/TagArticle/TagArticle';
import { NotFound } from '../../common/page/NotFound/NotFound';
import PDF from '../page/PDF';

interface RouterProps {
	location: {
		pathname: string;
	};
}

interface BlogRoutes {
	path: string;
	component: typeof React.Component;
	title: (pathname: string, nickname: string) => string | string;
	exact?: boolean;
	name?: string;
	icon?: string;
}
export const BASE_PATH = '/u/:id';
export const DOMAIN_PATH = '';
const setBlogName = (pageName: string, nickname: string) => `${pageName} | ` + nickname + '的小站';
export const blogRoutes: BlogRoutes[] = [
	{
		path: '/',
		component: Home,
		title: (pathname: string, nickname: string) => setBlogName('主页', nickname),
		name: '主页',
		icon: 'home'
	},
	{
		path: '/record',
		component: Record,
		title: (pathname: string, nickname: string) => setBlogName('归档', nickname),
		name: '归档',
		icon: 'bars'
	},
	{
		path: '/tag',
		component: Tag,
		title: (pathname: string, nickname: string) => setBlogName('标签', nickname),
		name: '标签',
		icon: 'tags'
	},
	{
		path: '/about',
		component: About,
		title: (pathname: string, nickname: string) => setBlogName('关于', nickname),
		name: '关于',
		icon: 'robot'
	},
	{
		path: '/about/pdf',
		component: PDF,
		title: (pathname: string, nickname: string) => setBlogName('简历', nickname),
		name: '简历'
	},
	{
		path: '/a/:id',
		component: Article,
		title: (pathname: string, nickname: string) => setBlogName(pathname.split('/a/')[1], nickname)
	},
	{
		path: '/t/:id',
		component: TagArticle,
		title: (pathname: string, nickname: string) => setBlogName(pathname.split('/t/')[1], nickname)
	},
	{
		path: '/*',
		component: NotFound,
		title: (pathname: string, nickname: string) => setBlogName('页面未找到', nickname)
	}
];
