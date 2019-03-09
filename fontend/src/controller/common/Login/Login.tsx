import React from 'react';
import { RouteProps, RouterProps } from 'react-router';
import { Row, Col } from 'antd';
import styles from './Login.module.scss';
import LoginForm from './components/LoginForm/LoginForm';
import { User } from '../../../interface/user.interface';
import TokenStorage from '../../../util/TokenStorage';
import { dispatchState } from '../../../store';
interface Props extends RouteProps, RouterProps {
	user: User;
}

export default class Login extends React.Component<Props> {
	async componentDidMount() {
		if (TokenStorage.getToken()) {
			await dispatchState({
				type: 'user/getUser'
			});
			this.props.history.push('/admin');
		}
	}

	public render() {
		return (
			<div className={styles['container']}>
				<Row gutter={24}>
					<Col span={14} />
					<Col span={8}>
						<LoginForm {...this.props} />
					</Col>
					<Col span={12} />
				</Row>
			</div>
		);
	}
}
