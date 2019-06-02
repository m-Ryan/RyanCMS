import React from 'react';
import { Row, Col } from 'antd';
import styles from './Register.module.scss';
import { RegisterInfo } from './components/RegisterInfo/RegisterInfo';
import RegisterForm from './components/RegisterForm/RegisterForm';
import { RouterProps } from 'react-router';
interface Props extends RouterProps {}
interface State {}
export default class Register extends React.Component<Props, State> {
	render() {
		return (
			<div className={styles['container']}>
				<Row gutter={24}>
					<Col span={12}>
						<RegisterInfo />
					</Col>
					<Col span={12}>
						<RegisterForm history={this.props.history} />
					</Col>
				</Row>
			</div>
		);
	}
}
