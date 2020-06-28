import { useAppSelector } from './useAppSelector';
import { useAppDispatch, useEffectLoading } from '../modal/ryan-store';
import { useCallback, useMemo } from 'react';
import { user } from '../modal/user';
import { useHistory } from 'react-router-dom';
import { message } from 'antd';
import { useConfig } from './useConfig';
import { config } from 'process';

export function useUser() {
  const history = useHistory();
  const userState = useAppSelector('user');
  const { configState } = useConfig();
  const dispatch = useAppDispatch();
  const effectLoading = useEffectLoading();

  const auth = useCallback(async (payload: Parameters<typeof user.effects.auth>[1]) => {
    await dispatch(user.effects.auth)(payload);
  }, [dispatch]);

  const register = useCallback(async (payload: Parameters<typeof user.effects.register>[1]) => {
    const data = await dispatch(user.effects.register)(payload);
    history.replace(data.domain && (data.domain === configState.acceptHost) ? '/' : `/u/${data.nickname}`);
    message.success('注册成功');
  }, [configState.acceptHost, dispatch, history]);

  const login = useCallback(async (payload: Parameters<typeof user.effects.login>[1]) => {
    const data = await dispatch(user.effects.login)(payload);
    history.replace(data.domain && (data.domain === configState.acceptHost) ? '/' : `/u/${data.nickname}`);
  }, [configState.acceptHost, dispatch, history]);

  const logout = useCallback(() => {
    dispatch(user.reducers.logout)();
  }, [dispatch]);

  const updateInfo = useCallback((payload: Parameters<typeof user.effects.updateInfo>[1]) => {
    return dispatch(user.effects.updateInfo)(payload);
  }, [dispatch]);

  const updateTheme = useCallback((payload: Parameters<typeof user.effects.updateTheme>[1]) => {
    return dispatch(user.effects.updateTheme)(payload);
  }, [dispatch]);

  return {
    userState,
    register,
    login,
    logout,
    auth,
    updateInfo,
    updateTheme,
    registerLoading: effectLoading(user.effects.register),
    loginLoading: effectLoading(user.effects.login),
    updateInfoLoading: effectLoading(user.effects.updateInfo)
  };
}
