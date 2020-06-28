import React, { useMemo, useCallback } from 'react';
import { Menu, Dropdown, Popover, Skeleton } from 'antd';
import { BgColorsOutlined, QuestionCircleOutlined, MailOutlined, CaretDownOutlined } from '@ant-design/icons';
import styles from './index.module.scss';
import { SketchPicker, ColorResult } from 'react-color';
import { Link } from '@/client/components/Link';
import { useUser } from '@/client/selector/useUser';
import { WhiteSpace } from '@/client/components/WhiteSpace';
import { useThemeColor } from '@/client/selector/useThemeColor';
import { PRIMARY_COLOR } from '@/client/constant';

export function Header() {

	const { userState, logout, updateTheme } = useUser();
	const { replaceColor } = useThemeColor();

	const setColor = useCallback(async (color: ColorResult) => {

		replaceColor({
			sourceColor: PRIMARY_COLOR,
			nextColor: color.hex
		});
		await updateTheme({ color: color.hex });
	}, [replaceColor, updateTheme]);

	const menu = useMemo(() => {
		return (
			<Menu>
				<Menu.Item>
					<Link type="user" to='/'>
						我的主页
					</Link>
				</Menu.Item>
				<Menu.Item>
					<div onClick={logout}>退出</div>
				</Menu.Item>
			</Menu>
		);
	}, [logout]);

	if (!userState) {
		return <Skeleton />;
	}

	return (
		<div className={styles['header-container'] + ' ' + 'reset-page'}>
			<div className={styles['header-content']}>
				<div className={styles['header-logo']}>
					<Link to="/admin">RyanCMS 内容管理系统</Link>
				</div>
				<div className={styles['header-navbar']}>
					<ul className={styles['header-menu']}>
						<li>
							<Popover content={<SketchPicker color={userState.theme.color} onChangeComplete={setColor} />} title="选择主题颜色">
								<div><BgColorsOutlined /> 主题</div>
							</Popover>
						</li>
						<li>
							<a>
								<QuestionCircleOutlined /> 帮助
							</a>
						</li>
						<li>
							<a
								target="_blank"
								href="http://mail.qq.com/cgi-bin/qm_share?t=qm_mailme&email=cx5eAQoSHTMVHAseEhofXRAcHg"
							>
								<MailOutlined /> 反馈
							</a>
						</li>
					</ul>
					<div className={styles['userpannel']}>
						<div className={styles['avatar']}>
							<img src={userState.avatar} alt="" />
						</div>
						<Dropdown overlay={menu}>
							<a className={styles['user-profile']}>
								<span>
									<span className={styles['user-name']}>{userState.nickname}</span>
									<br />
									<span className="user-rank">用户</span>
								</span>
								<WhiteSpace />
								<CaretDownOutlined />
							</a>
						</Dropdown>
					</div>
				</div>
			</div>
		</div>
	);
}
