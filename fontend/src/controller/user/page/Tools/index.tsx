import { Button, message } from 'antd';
import React from 'react';
import { RouteProps, RouterProps } from 'react-router';
import styles from './index.module.scss';
import LayoutTitle from '../../components/LayoutTitle/LayoutTitle';
import { ClearUnmountState } from '@/util/decorators/clearUnmountState';
import { User } from '@/interface/user.interface';
import { ReactAutoBind } from '@/util/decorators/reactAutoBind';
import { Link } from 'react-router-dom';

interface Props extends RouteProps, RouterProps {
	user: User;
}

interface State {
	loading: boolean;
	initLoading: boolean;
	resume: string;
}

@ClearUnmountState()
@ReactAutoBind()
export default class Tools extends React.Component<Props, State> {
	state: State = {
		loading: false,
		initLoading: false,
		resume: ''
	};

	public render() {
		return (
			<div className={styles['container']}>
				<LayoutTitle title="小工具" />
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
				<LayoutTitle title="常用站外工具" />
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
}
