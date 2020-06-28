import { useCallback } from 'react';
import { useAppDispatch, useEffectLoading } from '../modal/ryan-store';
import { categoryList } from '../modal/categoryList';
import { useAppSelector } from './useAppSelector';

export function useCategoryList() {
	const categoryListState = useAppSelector('categoryList')
	const dispatch = useAppDispatch();
	const effectLoading = useEffectLoading();

	const  getList = useCallback(()=> {
		dispatch(categoryList.effects.getList)();
	}, [ dispatch])

	const  getAdminList = useCallback(()=> {
		dispatch(categoryList.effects.getAddminList)();
	}, [ dispatch])

	const deleteCategory = useCallback((payload: Parameters<typeof categoryList.effects.deleteCategory>[1]) => {
		return dispatch(categoryList.effects.deleteCategory)(payload);
	}, [dispatch]);

	return {
		categoryListState,
		deleteCategory,
		getList,
		getAdminList,
		getListLoading: effectLoading(categoryList.effects.getList),
		getAdminListLoading: effectLoading(categoryList.effects.getAddminList),
		deleteCategoryLoading: effectLoading(categoryList.effects.deleteCategory),
	};
}
