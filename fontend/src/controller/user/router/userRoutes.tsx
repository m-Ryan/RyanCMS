import React from 'react';
import Home from '../page/Home/Home';
import ArticleManager from '../page/ArticleManager/ArticleManager';
import ArticleEditor from '../page/ArticleEditor/ArticleEditor';
import ArticleTag from '../page/ArticleTag/ArticleTag';
import ArticleCategory from '../page/ArticleCategory/ArticleCategory';
import UserSetting from '../page/UserSetting/UserSetting';
import IntroSetting from '../page/IntroSetting/IntroSetting';
import Tools from '../page/Tools';
import JsonToTs from '../page/Tools/JsonToTs';

interface RouterProps {
	location: {
		pathname: string;
	};
}

export interface UserRoutes {
	path: string;
	component: typeof React.Component;
	title: string;
	exact?: boolean;
	name?: string;
	icon?: string;
}
export const userRoutes: UserRoutes[] = [
	{
		path: '/admin',
		icon: 'home',
		component: Home,
		title: '个人中心'
	},
	{
		path: '/admin/article-manager',
		icon: 'book',
		component: ArticleManager,
		title: '文章管理'
	},

	{
		path: '/admin/article-manager/editor',
		title: '写文章',
		component: ArticleEditor
	},
	{
		path: '/admin/article-tag',
		icon: 'tags',
		component: ArticleTag,
		title: '标签管理'
	},
	{
		path: '/admin/article-category',
		icon: 'hdd',
		component: ArticleCategory,
		title: '栏目管理'
	},
	{
		path: '/admin/user-setting',
		icon: 'user',
		component: UserSetting,
		title: '个人信息设置'
	},
	{
		path: '/admin/intro-setting',
		icon: 'form',
		component: IntroSetting,
		title: '关于我的'
	},
	{
		path: '/admin/tools',
		icon: 'form',
		component: Tools,
		title: '小工具'
	},
	{
		path: '/admin/tools/json-to-interface',
		component: JsonToTs,
		title: 'json转interface'
	}
];
