import { Button } from 'antd';
import React from 'react';
import styles from './index.module.scss';
import HeaderTitle from '@/client/components/HeaderTitle';
import { Link } from '@/client/components/Link';

export default function Tools() {
	return (
		<div className={styles['container']}>
			<HeaderTitle title="小工具" />
			<div className={styles['tools']}>
				<Link to="/admin/tools/json-to-interface">
					<Button type="primary" className={styles['btn-link']}>
						JSON-to-Ts
						</Button>
				</Link>
				<Link to="/admin/tools/paste-source">
					<Button type="primary" className={styles['btn-link']}>
						粘贴源码
						</Button>
				</Link>
			</div>
			<div className={styles['divider']} />
			<HeaderTitle title="常用站外工具" />
			<div className={styles['tools']}>
				<a target="_blank" href="https://tool.lu/timestamp/">
					<Button type="primary" className={styles['btn-link']}>
						时间戳转换
						</Button>
				</a>
				<a target="_blank" href="http://www.bejson.com/">
					<Button type="primary" className={styles['btn-link']}>
						json处理
						</Button>
				</a>
				<a target="_blank" href="http://autoprefixer.github.io/">
					<Button type="primary" className={styles['btn-link']}>
						css在线补全
						</Button>
				</a>
				<a target="_blank" href="https://tinypng.com/">
					<Button type="primary" className={styles['btn-link']}>
						图片压缩
					</Button>
				</a>
			</div>
		</div>
	);
}