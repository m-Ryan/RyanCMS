import React, { useEffect } from 'react';
import styles from './index.module.scss';
import { Header } from './Header';
import { useBlogger } from '@/client/selector/useBlogger';
import { useParams } from 'react-router-dom';
import { PRIMARY_COLOR } from '@/client/constant';
import { useThemeColor } from '@/client/selector/useThemeColor';


export const LAYOUT_CONTAINER_ID = 'layout-container';

export function BlogLayout({ children }: { children: React.ReactNode; }) {
  const { user: bolggerName = '' } = useParams();
  const { bloggerState, getbloggerInfo } = useBlogger();
  const { themeColorState, replaceColor } = useThemeColor();

  useEffect(() => {
    if (!bloggerState) {
      getbloggerInfo(bolggerName);
    }

  }, [bloggerState, bolggerName, getbloggerInfo]);

  useEffect(() => {
    if (!themeColorState.currentStyle) {
      if (bloggerState && bloggerState.theme.color) {
        replaceColor({
          sourceColor: PRIMARY_COLOR,
          nextColor: bloggerState.theme.color
        });
      }
    }
  }, [replaceColor, themeColorState.currentStyle, bloggerState]);

  if (!bloggerState) return null;

  return (
    <div className={`row ${styles.container}`}>
      <div className={`col-lg-5 col-md-6 col-sm-24 col-xs-24 ${styles.header}`}>
        <Header />
      </div>
      <div
        id={LAYOUT_CONTAINER_ID}
        className={`col-lg-19 col-md-18 col-sm-24 col-xs-24 ${styles.content}`}
      >
        <div style={{ maxWidth: 1200 }}>{children}</div>
      </div>
    </div>
  );
}
