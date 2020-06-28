import React, { useEffect } from 'react';
import { useEffectError } from '../modal/ryan-store';
import { message } from 'antd';
import { useUser } from '../selector/useUser';
import { useThemeColor } from '../selector/useThemeColor';

export function FrameLayout({ children }: { children: React.ReactNode; }) {

  const { list, removeError } = useEffectError();
  const { userState, auth } = useUser();
  useThemeColor();

  useEffect(() => {
    if (!userState) {
      auth(false);
    }
  }, [auth, userState]);

  useEffect(() => {
    const currentError = list[0];
    if (currentError) {
      message.error(currentError.message, 1.5, () => {
        removeError(currentError);
      });
    }
  }, [list, removeError]);

  return <>{children}</>;
}

