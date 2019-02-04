import React from 'react';
import styles from './CustomerPageLoading.module.scss';
export const CustomerPageLoading = () => (
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
);
