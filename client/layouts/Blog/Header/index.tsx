import React, { useMemo, useState } from 'react';
import { Link } from '@/client/components/Link';
import {
  HomeOutlined,
  TagOutlined,
  RobotOutlined,
  BarsOutlined,
  MailOutlined,
  ZhihuOutlined,
  WeiboOutlined,
  GithubOutlined,
  MehOutlined,
  SmileOutlined,
  CloseOutlined,
} from '@ant-design/icons';
import { useUser } from '@/client/selector/useUser';
import { useBlogger } from '@/client/selector/useBlogger';
import styles from './index.module.scss';
import { WhiteSpace } from '@/client/components/WhiteSpace';

export function Header() {
  const [collapsed, setCollapsed] = useState(true);

  const { bloggerState } = useBlogger();
  const { userState: user } = useUser();

  const isOwner = useMemo(() => {
    return bloggerState && user && bloggerState.user_id === user.user_id;
  }, [bloggerState, user]);

  const memu = useMemo(() => {
    return (
      <>
        <li className={styles['menu-link']}>
          <Link type="blogger" to={'/'}>
            <HomeOutlined />
            <WhiteSpace />
            主页
          </Link>
        </li>
        <li className={styles['menu-link']}>
          <Link type="blogger" to={'/record'}>
            <BarsOutlined />
            <WhiteSpace />归档
          </Link>
        </li>
        <li className={styles['menu-link']}>
          <Link type="blogger" to={'/tag'}>
            <TagOutlined />
            <WhiteSpace />
            标签
          </Link>
        </li>
        <li className={styles['menu-link']}>
          <Link type="blogger" to={'/about'}>
            <RobotOutlined />
            <WhiteSpace />
            关于
          </Link>
        </li>
      </>
    );
  }, []);

  if (!bloggerState) return null;

  return (
    <div>
      <div className={styles.pc_header + ' row hidden-sm hidden-xs'}>
        <h2>{bloggerState.intro}</h2>
        <div className={styles.centerbox}>
          <div>
            <img src={bloggerState.avatar} alt="" className={styles.logo} />
          </div>
          <h1>{bloggerState.nickname}的博客</h1>
          <ul className={styles.pc_nav}>{memu}</ul>
          <div className={styles.concat}>
            <ul className={styles['concat-wrap']}>
              {bloggerState.concat.email && (
                <li className={styles['menu-link']}>
                  <a rel="noreferrer" target="_blank" href={bloggerState.concat.email}>
                    <MailOutlined />
                    <WhiteSpace /> 邮箱
                  </a>
                </li>
              )}
              {bloggerState.concat.github && (
                <li className={styles['menu-link']}>
                  <a rel="noreferrer" target="_blank" href={bloggerState.concat.github}>
                    <GithubOutlined />
                    <WhiteSpace /> github
                  </a>
                </li>
              )}
              {bloggerState.concat.zhihu && (
                <li className={styles['menu-link']}>
                  <a rel="noreferrer" target="_blank" href={bloggerState.concat.zhihu}>
                    <ZhihuOutlined />
                    <WhiteSpace /> 知乎
                  </a>
                </li>
              )}
              {bloggerState.concat.weibo && (
                <li className={styles['menu-link']}>
                  <a rel="noreferrer" target="_blank" href={bloggerState.concat.weibo}>
                    <WeiboOutlined />
                    <WhiteSpace /> 微博
                  </a>
                </li>
              )}
            </ul>
          </div>
          <div className={styles.footer}>
            {isOwner ? (
              <Link to="/admin">
                <MehOutlined />
                <WhiteSpace />
                后台管理
              </Link>
            ) : (
                <Link to="/login">
                  <SmileOutlined />
                  <WhiteSpace />
                马上登陆
                </Link>
              )}
          </div>
        </div>
      </div>
      <div className={styles.mb_header + ' hidden-md hidden-lg'}>
        <div
          className={styles.mb_menu_btn}
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? (
            <span>
              <BarsOutlined />
            </span>
          ) : (
              <span>
                <CloseOutlined />
              </span>
            )}
        </div>
        <ul
          className={styles.mb_nav}
          style={{ maxHeight: collapsed ? 0 : '500px' }}
        >
          {memu}
        </ul>
      </div>
      <div className={styles.mb_header_placeholder + ' hidden-md hidden-lg'}></div>
    </div>
  );
}
