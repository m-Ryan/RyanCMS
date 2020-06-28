import React, { useState } from 'react';
import { Menu } from 'antd';
import { useHistory } from 'react-router-dom';
import styles from './index.module.scss';
import { Menu as AMenu, } from 'antd';
import { HomeOutlined, BookOutlined, TagsOutlined, HddOutlined, UserOutlined, FormOutlined, ToolOutlined } from '@ant-design/icons';
import { matchPath } from 'react-router';

const SubMenu = Menu.SubMenu;

export type AppMenuItem = {
	path?: string;
	title: string;
	icon: React.ForwardRefExoticComponent<any>;
	isOpen?: boolean;
	children?: AppMenuItem[];
};


export interface IAppSubMenuItem {
	name: string;
	url: string;
	isOpen?: boolean;
}

const menuRoutes: AppMenuItem[] = [
	{
		path: '/admin',
		icon: HomeOutlined,
		title: '个人中心'
	},
	{
		path: '/admin/article-manager',
		icon: BookOutlined,
		title: '文章管理'
	},
	{
		path: '/admin/article-tag',
		icon: TagsOutlined,
		title: '标签管理'
	},
	{
		path: '/admin/article-category',
		icon: HddOutlined,
		title: '栏目管理'
	},
	{
		path: '/admin/user-setting',
		icon: UserOutlined,
		title: '个人信息设置'
	},
	{
		path: '/admin/intro-setting',
		icon: FormOutlined,
		title: '关于我的'
	},
	{
		path: '/admin/tools',
		icon: ToolOutlined,
		title: '小工具'
	},
];

export default function SideBar() {
	const [selectedKey, setSelectedKey] = useState(menuRoutes.findIndex(route=>matchPath(location.pathname, { ...route, exact: true })).toString());

	const history = useHistory();

	const onClickMenuItem = (item: AppMenuItem, index: number) => {
		setSelectedKey(index.toString());
		history.push(item.path!);
	};

	const renderMenu = () => {
		return menuRoutes.map((menuItem, index) => {
			return (
				<AMenu.Item key={index} onClick={() => onClickMenuItem(menuItem, index)}>
					<menuItem.icon />
					<span>{menuItem.title}</span>
				</AMenu.Item>
			)
		});
	}

		return (
			<div className={styles.aside}>
				<AMenu selectedKeys={[selectedKey]} mode="inline" theme="light">
					{renderMenu()}
				</AMenu>
			</div>
		);
	};
