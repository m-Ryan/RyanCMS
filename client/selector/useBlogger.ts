import { useAppSelector } from './useAppSelector';
import { useCallback } from 'react';
import { useAppDispatch } from '../modal/ryan-store';
import { blogger } from '../modal/blogger';
import { useConfig } from './useConfig';

export function useBlogger() {
	const { configState } = useConfig();
	const dispatch = useAppDispatch();
	const bloggerState = useAppSelector('blogger');

	const getbloggerInfo = useCallback((nickname?: string) => {

		dispatch(blogger.effects.getUser)({
			domain: configState.acceptHost,
			nickname
		 });
	}, [configState.acceptHost, dispatch]);

	return {
		bloggerState,
		getbloggerInfo
	};
}
