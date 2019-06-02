import React from 'react';
import { RouteProps, RouterProps } from 'react-router';
import { Row, Col } from 'antd';
import styles from './Login.module.scss';
import LoginForm from './components/LoginForm/LoginForm';
interface Props extends RouteProps, RouterProps {}

export default class Login extends React.Component<Props> {
	public render() {
		return (
			<div className={styles['container']}>
				<Row gutter={24}>
					<Col span={14} />
					<Col span={8}>
						<LoginForm history={this.props.history} />
					</Col>
					<Col span={12} />
				</Row>
			</div>
		);
	}
}
