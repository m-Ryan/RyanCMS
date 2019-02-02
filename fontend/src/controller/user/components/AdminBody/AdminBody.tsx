import React from 'react';
import styles from './AdminBody.module.scss';
interface Props {
	children: React.ReactNode;
}

interface State {
	activeKey: string;
}

export default function AdminBody(props: Props) {
	return (
		<div className={styles['scroll-container']}>
			<div className={styles['content']}>{props.children}</div>
		</div>
	);
}
