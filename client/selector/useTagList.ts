import { useAppSelector } from './useAppSelector';
import { useAppDispatch, useEffectLoading } from '../modal/ryan-store';
import { useCallback } from 'react';
import { tagList } from '../modal/tagList';

export function useTagList() {
	const tagListState = useAppSelector('tagList');
	const effectLoading = useEffectLoading();
	const dispatch = useAppDispatch();

	const getList = useCallback((payload: Parameters<typeof tagList.effects.getList>[1]) => {
		return dispatch(tagList.effects.getList)(payload);
	}, [dispatch]);

	const getAdminList = useCallback(() => {
		dispatch(tagList.effects.getAddminList)();
	}, [dispatch]);

	const deleteTag = useCallback((payload: Parameters<typeof tagList.effects.deleteTag>[1]) => {
		return dispatch(tagList.effects.deleteTag)(payload);
	}, [dispatch]);


	return {
		tagListState,
		deleteTag,
		getList,
		getAdminList,
		deleteTagLoading: effectLoading(tagList.effects.deleteTag),
		getListLoading: effectLoading(tagList.effects.getList),
		getAdminListLoading: effectLoading(tagList.effects.getAddminList),
	};
}
