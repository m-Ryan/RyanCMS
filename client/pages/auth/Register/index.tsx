import React from 'react';
import { Row, Col } from 'antd';
import styles from './index.module.scss';
import { RegisterInfo } from './components/RegisterInfo';
import { RegisterForm } from './components/RegisterForm';

export default function Register() {
	return (
		<div className={styles['container']}>
			<Row gutter={24}>
				<Col span={12}>
					<RegisterInfo />
				</Col>
				<Col span={12}>
					<RegisterForm />
				</Col>
			</Row>
		</div>
	);
}