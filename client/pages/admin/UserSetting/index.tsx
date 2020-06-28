import React from 'react';
import styles from './index.module.scss';
import HeaderTitle from '@/client/components/HeaderTitle';
import { UserSettingForm } from './components/UserSettingForm';

export default function UserSetting() {
	return (
		<div className={styles['container']}>
			<HeaderTitle title="个人中心" />
			<div>
				<UserSettingForm />
			</div>
		</div>
	);
}