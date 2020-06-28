import { useAppSelector } from './useAppSelector';
import { useCallback } from 'react';
import { useAppDispatch, useEffectLoading } from '../modal/ryan-store';
import { articleList } from '../modal/articleList';

export function useArticleList() {
	const articleListState = useAppSelector('articleList');
	const dispatch = useAppDispatch();
	const effectLoading = useEffectLoading();

	const getList = useCallback((payload: Parameters<typeof articleList.effects.getList>[1]) => {
		return dispatch(articleList.effects.getList)(payload);
	}, [dispatch]);

	const getAdminList = useCallback((payload: Parameters<typeof articleList.effects.getAdminList>[1]) => {
		return dispatch(articleList.effects.getAdminList)(payload);
	}, [dispatch]);

	return {
		articleListState,
		getList,
		getListLoading: effectLoading(articleList.effects.getList),
		getAdminList,
		getAdminListLoading: effectLoading(articleList.effects.getAdminList)
	};
}
