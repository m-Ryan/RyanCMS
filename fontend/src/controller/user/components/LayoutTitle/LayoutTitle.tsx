import React from 'react';
import styles from './LayoutTitle.module.scss';
interface Props {
	title: string | React.ReactNode;
	aside?: React.ReactNode;
}
export default function LayoutTitle(props: Props) {
	return (
		<div className={styles['title']}>
			{props.title}
			{props.aside}
		</div>
	);
}
