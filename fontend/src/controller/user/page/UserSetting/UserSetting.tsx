import React from 'react';
import styles from './UserSetting.module.scss';
import LayoutTitle from '../../components/LayoutTitle/LayoutTitle';
import UserSettingForm from './UserSettingForm/UserSettingForm';
import { connect } from 'ryan-redux';
import { User } from '../../../../interface/user.interface';
import { History } from 'history';
interface Props {
	user: User;
	history: History;
}
interface State {}
@connect(({ user }: { user: User }) => ({
	user
}))
export default class UserSetting extends React.Component<Props, State> {
	submit() {}
	render() {
		return (
			<div className={styles['container']}>
				<LayoutTitle title="个人中心" />
				<div>
					<UserSettingForm {...this.props} />
				</div>
			</div>
		);
	}
}
