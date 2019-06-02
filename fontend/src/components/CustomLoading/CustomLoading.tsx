import React from 'react';
import styles from './CustomLoading.module.scss';
import { Spin, Icon } from 'antd';
interface Props {
	show?: boolean;
	className?: string;
}
export function CustomLoading(props: Props) {
	const { show = true, className = '' } = props;
	return show ? (
		<div className={[ styles['container'], className ].join(' ')}>
			<Spin indicator={<Icon type="loading" style={{ fontSize: 36, width: 'auto' }} spin />} />
		</div>
	) : null;
}
