import * as React from 'react';
import * as styles from './Header.module.scss';
import { Icon } from 'antd';
import { Link } from 'react-router-dom';
import { User } from '@/interface/user.interface';
import { blogRoutes, DOMAIN_PATH, BASE_PATH } from '../../router/blogRoutes';
import { connect } from 'ryan-redux';
import { Location } from 'history';
import { routerModel } from '../../../../model';
interface Props {
	blogger: User;
	user?: User;
}
interface State {
	collapsed: boolean;
}
@connect(({ router }: { router: Location }) => ({ router }))
class Header extends React.Component<Props, State> {
	state = {
		collapsed: true
	};

	render() {
		const { collapsed } = this.state;
		const { blogger, user } = this.props;
		const prefixPath = routerModel.getPrefixPath();
		return (
			<div>
				<div className={styles['pc_header'] + ' row hidden-sm hidden-xs'}>
					<h2>{blogger.intro}</h2>
					<div className={styles['centerbox']}>
						<div>
							<img src={blogger.avatar} alt="" className={styles['logo']} />
						</div>
						<h1>{blogger.nickname}的博客</h1>
						<ul className={styles['pc_nav']}>
							{blogRoutes.filter((item) => !!item.icon).map((item) => (
								<li key={item.path} className={styles['menu-link']}>
									<Link to={prefixPath.replace(':id', blogger.nickname) + item.path}>
										<Icon type={item!.icon} />
										&nbsp;
										{item.name}
									</Link>
								</li>
							))}
						</ul>
						<div className={styles['concat']}>
							<ul className={styles['concat-wrap']}>
								{blogger.concat.email && (
									<li className={styles['menu-link']}>
										<a target="_blank" href={blogger.concat.email}>
											<Icon type={'mail'} />
											&nbsp; 邮箱
										</a>
									</li>
								)}
								{blogger.concat.github && (
									<li className={styles['menu-link']}>
										<a target="_blank" href={blogger.concat.github}>
											<Icon type={'github'} />
											&nbsp; github
										</a>
									</li>
								)}
								{blogger.concat.zhihu && (
									<li className={styles['menu-link']}>
										<a target="_blank" href={blogger.concat.zhihu}>
											<Icon type={'zhihu'} />
											&nbsp; 知乎
										</a>
									</li>
								)}
								{blogger.concat.weibo && (
									<li className={styles['menu-link']}>
										<a target="_blank" href={blogger.concat.weibo}>
											<Icon type={'weibo'} />
											&nbsp; 微博
										</a>
									</li>
								)}
							</ul>
						</div>
						<div className={styles['footer']}>
							{user ? (
								<Link to="/admin">
									<Icon type={'meh'} /> 后台管理
								</Link>
							) : (
								<Link to="/login">
									<Icon type={'smile'} /> 马上登陆
								</Link>
							)}
						</div>
					</div>
				</div>
				<div className={styles['mb_header'] + ' hidden-md hidden-lg'}>
					<div
						className={styles['mb_menu_btn']}
						onClick={() =>
							this.setState({
								collapsed: !collapsed
							})}
					>
						{collapsed ? (
							<span>
								<Icon type="bars" />
							</span>
						) : (
							<span>
								<Icon type="close" />
							</span>
						)}
					</div>
					<ul
						className={styles['mb_nav']}
						style={{
							maxHeight: collapsed ? 0 : '500px'
						}}
					>
						{blogRoutes.filter((item) => !!item.icon).map((item) => (
							<li key={item.path} className={styles['menu-link']}>
								<Link to={prefixPath.replace(':id', blogger.nickname) + item.path}>
									<span>
										<Icon type={item!.icon} />
										&nbsp;
										{item.name}
									</span>
								</Link>
							</li>
						))}
					</ul>
				</div>
			</div>
		);
	}
}
export default Header;
