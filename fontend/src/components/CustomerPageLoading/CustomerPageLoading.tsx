import React from 'react';
import styles from './CustomerPageLoading.module.scss';
interface props {
	show: boolean;
}
export const CustomerPageLoading = (props: props) => {
	const { show = true } = props;
	return show ? (
		<div className={styles['loading-container']}>
			<div className={styles['loading-wrap']}>
				<div className={styles['loader']}>
					<div className={styles['loader-inner pacman']}>
						<div />
						<div />
						<div />
						<div />
						<div />
					</div>
				</div>
			</div>
		</div>
	) : null;
};
