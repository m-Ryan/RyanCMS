import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, Icon, Dropdown, Popover, Button, message } from 'antd';
import styles from './Header.module.scss';
import { User } from '@/interface/user.interface';
import { ReactAutoBind } from '@/util/decorators/reactAutoBind';
import { userModel, routerModel } from '@/model';
import { SketchPicker, ColorResult } from 'react-color';
import { themeModel } from '@/model';
import { API } from '@/services/API';
import { catchError } from '@/util/decorators/catchError';

interface Props {
	user: User;
}
interface State {}
@ReactAutoBind()
export default class Header extends React.Component<Props, State> {
	logout() {
		userModel.logout();
	}

	@catchError()
	async setColor(colorResult: ColorResult) {
		themeModel.saveThemeColor([
			{
				name: 'primary',
				color: colorResult.hex
			}
		]);
		await API.user.user.updateTheme({ color: colorResult.hex });
		message.success('已更改主题');
	}

	static defaultProps = {};
	render() {
		const { user } = this.props;
		const prefixPath = routerModel.getPrefixPath();
		const menu = (
			<Menu>
				<Menu.Item>
					<Link target="_blank" to={prefixPath.replace(':id', user.nickname)}>
						我的主页
					</Link>
				</Menu.Item>
				<Menu.Item>
					<div onClick={this.logout}>退出</div>
				</Menu.Item>
			</Menu>
		);
		return (
			<div className={styles['header-container'] + ' ' + 'reset-page'}>
				<div className={styles['header-content']}>
					<div className={styles['header-logo']}>
						<Link to="/admin">RyanCMS 内容管理系统</Link>
					</div>
					<div className={styles['header-navbar']}>
						<ul className={styles['header-menu']}>
							<li>
								<Popover content={<SketchPicker onChangeComplete={this.setColor} />} title="选择主题颜色">
									<Icon type="bg-colors" /> 主题
								</Popover>
							</li>
							<li>
								<a href="javascript:void(0)">
									<Icon type="question-circle" /> 帮助
								</a>
							</li>
							<li>
								<a
									target="_blank"
									href="http://mail.qq.com/cgi-bin/qm_share?t=qm_mailme&email=cx5eAQoSHTMVHAseEhofXRAcHg"
								>
									<Icon type="mail" /> 反馈
								</a>
							</li>
						</ul>
						<div className={styles['userpannel']}>
							<div className={styles['avatar']}>
								<img src={user.avatar} alt="" />
							</div>
							<Dropdown overlay={menu}>
								<a className={styles['user-profile']}>
									<span>
										<span className={styles['user-name']}>{user.nickname}</span>
										<br />
										<span className="user-rank">用户</span>
									</span>
									&nbsp;
									<Icon type="caret-down" />
								</a>
							</Dropdown>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
