import React from 'react';
import { RouteProps, RouterProps } from 'react-router';
import { Row, Col } from 'antd';
import styles from './Login.module.scss';
import LoginForm from './components/LoginForm/LoginForm';
import { User } from '../../../interface/user.interface';
interface Props extends RouteProps, RouterProps {
	user: User;
}

export default class Login extends React.Component<Props> {
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
