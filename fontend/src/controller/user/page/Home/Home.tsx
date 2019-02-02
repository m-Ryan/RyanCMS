import React from 'react';
import { RouteProps, RouterProps } from 'react-router';
import styles from './Home.module.scss';
import LayoutTitle from '../../components/LayoutTitle/LayoutTitle';
import { User } from '../../../../interface/user.interface';
interface Props extends RouteProps, RouterProps {
	user: User;
}
interface State {
	loading: boolean;
}

export default class Home extends React.Component<Props, State> {
	state: State = {
		loading: false
	};
	render() {
		return (
			<div className={styles['container']}>
				<LayoutTitle title="个人中心" />
				<div>后台</div>
			</div>
		);
	}
}
