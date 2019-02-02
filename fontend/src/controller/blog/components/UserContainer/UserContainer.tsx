import React from 'react';
import styles from './UserContainer.module.scss';
import { User } from '../../../../interface/user.interface';
import Header from '../Header/Header';
import { Link } from 'react-router-dom';
import { Button } from 'antd';
import { dispatchState } from '../../../../store';
interface Props {
	blogger: User;
	children: any;
	user?: User;
}

export function UserContainer(props: Props) {
	const { blogger, children, user } = props;
	return (
		<div className={`row ${styles['container']}`}>
			<div className={`col-lg-5 col-md-6 col-sm-24 col-xs-24 ${styles['header']}`}>
				<Header user={user} blogger={blogger} />
			</div>
			<div className={`col-lg-19 col-md-18 col-sm-24 col-xs-24  ${styles['content']}`}>{children}</div>
		</div>
	);
}
