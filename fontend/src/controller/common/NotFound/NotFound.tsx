import React from 'react';
import styles from './NotFound.module.scss';
import { Link } from 'react-router-dom';
export function NotFound() {
	document.title = '页面找不到';
	return (
		<div className={styles['container']}>
			<div className={styles['center']}>
				<div className={styles['text']}>
					<h1>404</h1>
					<h2>Not Found</h2>
				</div>
			</div>
			<div className={styles['footer']}>
				<br />
				<p>© 2019 - 01 - RyanCMS -</p>
				<p>
					<span className={styles['hitokoto']}>离别并不痛苦，因为我们都微笑着。</span>
				</p>
			</div>
		</div>
	);
}
