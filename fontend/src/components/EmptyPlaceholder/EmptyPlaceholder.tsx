import * as React from 'react';
import * as styles from './EmptyPlaceholder.module.scss';

interface Props {
	size: number;
	children?: React.ReactNode;
}
export function EmptyPlaceholder(props: Props) {
	const { size = 14, children } = props;
	return (
		<div className={styles['container']}>
			<i style={{ fontSize: size }} className="iconfont icon-kongshuju1" />
			{children}
		</div>
	);
}
