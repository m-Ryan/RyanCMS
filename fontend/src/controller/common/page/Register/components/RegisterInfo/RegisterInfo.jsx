import React from 'react';
import styles from './RegisterInfo.module.scss';
export function RegisterInfo() {
	return (
		<div className={styles['container']}>
			<div className={styles['logo']}>
				<a href="/#" className={styles['link']}>
					<img className={styles['logoImg']} src={require('@/assets/images/logo.png')} alt="logo" />
				</a>
			</div>
			<div className={styles['title']}>
				RyanCMS 内容管理系统
				<br />
				<br />
				让博客内容管理更加轻松、高效、便捷
			</div>
			<div className={styles['border']} />
		</div>
	);
}
