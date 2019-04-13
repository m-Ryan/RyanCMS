import React from 'react';
import { RouteProps, RouterProps } from 'react-router';
import { Row, Col } from 'antd';
import styles from './Login.module.scss';
import LoginForm from './components/LoginForm/LoginForm';
import { User } from '@/interface/user.interface';
import TokenStorage from '@/util/TokenStorage';
import { userModel } from '../../../../model';
interface Props extends RouteProps, RouterProps {
	user: User;
}
interface State {
	isMounted: boolean;
}
export default class Login extends React.Component<Props, State> {
	state: State = {
		isMounted: false
	};
	async componentDidMount() {
		if (TokenStorage.getToken()) {
			await userModel.getUser();
			this.props.history.push('/admin');
			return;
		}
		this.setState({
			isMounted: true
		});
	}

	public render() {
		return (
			this.state.isMounted && (
				<div className={styles['container']}>
					<Row gutter={24}>
						<Col span={14} />
						<Col span={8}>
							<LoginForm {...this.props} />
						</Col>
						<Col span={12} />
					</Row>
				</div>
			)
		);
	}
}
