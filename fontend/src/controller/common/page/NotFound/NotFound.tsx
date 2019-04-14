import React from 'react';
import styles from './NotFound.module.scss';
export class NotFound extends React.Component {
	componentDidMount() {
		document.title = '页面找不到';
	}
	render() {
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
}
