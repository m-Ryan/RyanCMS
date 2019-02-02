import React from 'react';
import styles from './CustomLoading.module.scss';
import { Spin, Icon } from 'antd';
export function CustomLoading() {
	return (
		<div className={styles['container']}>
			<Spin indicator={<Icon type="loading" style={{ fontSize: 36, width: 'auto' }} spin />} />
		</div>
	);
}
