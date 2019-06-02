import React from 'react';
import { RouteProps, RouterProps } from 'react-router';
import styles from './Home.module.scss';
import LayoutTitle from '../../components/LayoutTitle/LayoutTitle';
import { User } from '../../../../interface/user.interface';
import { ReactAutoBind } from '@/util/decorators/reactAutoBind';
interface Props extends RouteProps, RouterProps {
	user: User;
}
interface State {
	loading: boolean;
}

@ReactAutoBind()
export default class Home extends React.Component<Props, State> {
	state: State = {
		loading: false
	};

	render() {
		return (
			<div className={styles['container']}>
				<LayoutTitle title="个人中心" />
			</div>
		);
	}
}
