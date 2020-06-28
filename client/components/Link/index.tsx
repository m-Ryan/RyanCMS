import React, { useCallback, useMemo } from 'react';
import { Link as ReactLink, LinkProps } from 'react-router-dom';
import { useBlogger } from '@/client/selector/useBlogger';
import { useConfig } from '@/client/selector/useConfig';
import { useUser } from '@/client/selector/useUser';

export function useLink(type?: 'blogger' | 'user') {
  const { bloggerState: blogger } = useBlogger();
  const { userState } = useUser();
  const { configState } = useConfig();

  const getBloggerUrl = useCallback((url: string) => {
    if (blogger) {
      if (configState.acceptHost && blogger.domain && (blogger.domain === configState.acceptHost)) {
        return url;
      } else {
        return `/u/${blogger.nickname}${url}`;
      }
    }

    return url;
  }, [blogger, configState.acceptHost]);

  const getAdminUrl = useCallback((url: string) => {
    if (userState) {
      if (configState.acceptHost && userState.domain && (userState.domain === configState.acceptHost)) {
        return url;
      } else {
        return `/u/${userState.nickname}${url}`;
      }
    }

    return url;
  }, [configState.acceptHost, userState]);

  const getFormatUrl = useCallback((url: string) => {
    if (type === 'blogger') return getBloggerUrl(url);
    if (type === 'user') return getAdminUrl(url);

    return url;
  }, [getAdminUrl, getBloggerUrl, type]);

  return {
    getFormatUrl,
    getBloggerUrl,
    getAdminUrl
  };
}

export function Link(props: Omit<LinkProps, 'to'> & { to: string; type?: 'blogger' | 'user'; }) {
  const { getFormatUrl } = useLink(props.type);

  return <ReactLink {...props} to={getFormatUrl(props.to)} />;
}

