import * as React from 'react';
import * as styles from './NotFound.module.scss';
import { Link } from 'react-router-dom';

export default class PageNotFound extends React.PureComponent {
	componentDidMount() {
		document.title = '页面找不到';
	}

	render() {
		return (
			<div className={styles['container']}>
				<div className={styles['exception-ontent']}>
					<img src={require('@/assets/images/no_found.png')} className={styles['imgException']} alt="页面不存在" />
					<div>
						<h3 className={styles['title']}>抱歉，你访问的页面不存在</h3>
						<p className={styles['description']}>
							您要找的页面没有找到，请返回<Link to={'/'}>首页</Link>继续浏览
						</p>
					</div>
				</div>
			</div>
		);
	}
}
