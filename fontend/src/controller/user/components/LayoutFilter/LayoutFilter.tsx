import React from 'react';
import styles from './LayoutFilter.module.scss';
interface Props {
	children: string | React.ReactNode;
}
export function LayoutFilter(props: Props) {
	return <div className={styles['container']}>{props.children}</div>;
}
