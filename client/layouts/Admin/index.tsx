import React, { useEffect, useState } from 'react';
import styles from './index.module.scss';
import { Header } from './Header';
import { useAppStore } from '@/client/modal/ryan-store';
import { useUser } from '@/client/selector/useUser';
import SideBar from './SideBar';
import { isServer } from '@/client/utils/tools';
import { useDocumentTitle } from '@/client/hooks/useDocumentTitle';
import { useThemeColor } from '@/client/selector/useThemeColor';
import { PRIMARY_COLOR } from '@/client/constant';
export const LAYOUT_CONTAINER_ID = 'layout-container';


export function AdminLayout({ children }: { children: React.ReactNode; }) {
  const { endSSR } = useAppStore();
  const { userState, auth } = useUser();
  const { themeColorState, replaceColor } = useThemeColor();

  useDocumentTitle('管理后台');

  useEffect(() => {
    if (themeColorState.currentStyle) {
      endSSR();
    } else if (themeColorState.source) {
      replaceColor({ sourceColor: PRIMARY_COLOR, nextColor: PRIMARY_COLOR });
    }

  }, [endSSR, replaceColor, themeColorState.currentStyle, themeColorState.source]);

  useEffect(() => {
    if (!userState) {
      auth(true);
    } else {
      replaceColor({ sourceColor: PRIMARY_COLOR, nextColor: userState.theme.color });
    }
  }, [auth, replaceColor, userState]);

  useEffect(() => {
    if (!themeColorState.currentStyle) {
      if (userState && userState.theme.color) {
        replaceColor({
          sourceColor: PRIMARY_COLOR,
          nextColor: userState.theme.color
        });
      }
    }
  }, [replaceColor, themeColorState.currentStyle, userState]);


  if (isServer()) return null;

  if (!userState) return null;

  return (
    <div>
      <Header />
      <div className={styles['body-container']}>
        <SideBar />
        <div className={styles['scroll-container']}>
          <div className={styles['content']}>{children}</div>
        </div>
      </div>
    </div>
  );
}
