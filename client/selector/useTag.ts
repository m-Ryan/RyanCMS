import { useAppSelector } from './useAppSelector';
import { useAppDispatch, useEffectLoading } from '../modal/ryan-store';
import { useCallback } from 'react';
import { tag } from '../modal/tag';

export function useTag() {
	const tagState = useAppSelector('tag');
	const dispatch = useAppDispatch();
	const effectLoading = useEffectLoading();

	const addTag = useCallback((payload: Parameters<typeof tag.effects.addTag>[1]) => {
		return dispatch(tag.effects.addTag)(payload);
	}, [dispatch]);

	const updateTag = useCallback((payload: Parameters<typeof tag.effects.updateTag>[1]) => {
		return dispatch(tag.effects.updateTag)(payload);
	}, [dispatch]);

	return {
		tagState,
		addTag,
		updateTag,
		addTagLoading: effectLoading(tag.effects.addTag),
		updateTagLoading: effectLoading(tag.effects.updateTag),
	};
}
