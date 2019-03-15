import React from 'react';
import { Row, Col } from 'antd';
import styles from './Register.module.scss';
import { RegisterInfo } from './components/RegisterInfo/RegisterInfo';
import RegisterForm from './components/RegisterForm/RegisterForm';
import { RouterProps } from 'react-router';
import TokenStorage from '@/util/TokenStorage';
import userModel from '../../../model/user';
interface Props extends RouterProps {}
export default class Register extends React.Component<Props> {
	async componentDidMount() {
		if (TokenStorage.getToken()) {
			await userModel.getUser();
			this.props.history.push('/admin');
		}
	}

	render() {
		return (
			<div className={styles['container']}>
				<Row gutter={24}>
					<Col span={12}>
						<RegisterInfo />
					</Col>
					<Col span={12}>
						<RegisterForm {...this.props} />
					</Col>
				</Row>
			</div>
		);
	}
}
