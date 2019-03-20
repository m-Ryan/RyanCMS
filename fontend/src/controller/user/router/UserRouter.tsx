import React from 'react';
import { Route, Switch } from 'react-router';
import { User } from '@/interface/user.interface';
import { connect } from 'react-redux';
import { CustomerPageLoading } from '@/components/CustomerPageLoading/CustomerPageLoading';
import { userRoutes } from './userRoutes';
import Header from '../components/Header/Header';
import AdminBody from '../components/AdminBody/AdminBody';
import LayoutNavigator from '../components/LayoutNavigator/LayoutNavigator';
import styles from './UserRouter.module.scss';
import { catchError } from '@/util/decorators/catchError';
import { History } from 'history';
import TokenStorage from '@/util/TokenStorage';
import { userModel } from '../../../model';

interface ConnectProps {
	user: User;
}

interface Props extends ConnectProps {
	history: History;
	location: Location;
	bloggers: User[];
}

@connect(({ user }: ConnectProps) => ({ user }))
export default class UserRouter extends React.Component<Props> {
	componentDidMount() {
		this.initData();
	}
	@catchError(function(this: UserRouter) {
		this.props.history.push('/login');
	})
	async initData() {
		await userModel.getUser();
	}

	componentDidUpdate() {
		if (!this.props.user && !TokenStorage.getToken()) {
			this.props.history.push('/login');
		}
	}

	render() {
		const { user, location } = this.props;
		return user ? (
			<React.Fragment>
				<Header user={user} />
				<div className={styles['body-container']}>
					<LayoutNavigator
						pathname={location.pathname}
						menuRoutes={userRoutes.filter((item) => !!item.icon)}
					/>
					<AdminBody>
						<Switch>
							{userRoutes.map((route, index) => (
								<Route
									key={index}
									exact={true}
									path={route.path}
									component={() => <route.component user={user} {...this.props} />}
								/>
							))}
						</Switch>
					</AdminBody>
				</div>
			</React.Fragment>
		) : (
			<CustomerPageLoading />
		);
	}
}
