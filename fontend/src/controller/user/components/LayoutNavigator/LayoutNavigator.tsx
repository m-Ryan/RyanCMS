import React from 'react';
import { Menu, Icon } from 'antd';
import { Link } from 'react-router-dom';
import styles from './LayoutNavigator.module.scss';
import { UserRoutes } from '../../router/userRoutes';
interface Props {
	menuRoutes: UserRoutes[];
	pathname: string;
}

export default function LayoutNavigator(props: Props) {
	const { pathname, menuRoutes } = props;
	return (
		<Menu selectedKeys={[]} className={styles['aside']}>
			{menuRoutes.map((item, index) => (
				<Menu.Item
					key={item.path}
					className={item.path === pathname ? styles['activity-item'] : styles['menu-item']}
				>
					<Link to={item.path}>
						<Icon type={item.icon} />&nbsp;
						{item.title}
					</Link>
				</Menu.Item>
			))}
		</Menu>
	);
}
