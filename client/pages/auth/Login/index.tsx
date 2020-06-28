import React from 'react';
import { Row, Col } from 'antd';
import styles from './index.module.scss';
import { LoginForm } from './components/LoginForm/index';

export default function Login() {
	return (
		<div className={styles['container']}>
			<Row gutter={24}>
				<Col span={14} />
				<Col span={8}>
					<LoginForm />
				</Col>
				<Col span={12} />
			</Row>
		</div>
	);
}