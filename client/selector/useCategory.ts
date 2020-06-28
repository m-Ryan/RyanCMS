import { useAppSelector } from './useAppSelector';
import { useAppDispatch, useEffectLoading } from '../modal/ryan-store';
import { useCallback } from 'react';
import { category } from '../modal/category';

export function useCategory() {
	const categoryState = useAppSelector('category');
	const dispatch = useAppDispatch();
	const effectLoading = useEffectLoading();

	const addCategory = useCallback((payload: Parameters<typeof category.effects.addCategory>[1]) => {
		return dispatch(category.effects.addCategory)(payload);
	}, [dispatch]);

	const updateCategory = useCallback((payload: Parameters<typeof category.effects.updateCategory>[1]) => {
		return dispatch(category.effects.updateCategory)(payload);
	}, [dispatch]);

	return {
		categoryState,
		addCategory,
		updateCategory,
		addCategoryLoading: effectLoading(category.effects.addCategory),
		updateCategoryLoading: effectLoading(category.effects.updateCategory),
	};
}
