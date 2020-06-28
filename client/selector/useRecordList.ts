import { useAppDispatch, useEffectLoading } from '../modal/ryan-store';
import { useAppSelector } from './useAppSelector';
import { useCallback } from 'react';
import { recordList } from '../modal/recordList';

export function useRecordList() {
	const recordListState = useAppSelector('recordList');
	const dispatch = useAppDispatch();
	const effectLoading = useEffectLoading();

	const getList = useCallback((payload: Parameters<typeof recordList.effects.getList>[1]) => {
		return dispatch(recordList.effects.getList)(payload);
	}, [dispatch]);

	return {
		recordListState,
		getList,
		getListLoading: effectLoading(recordList.effects.getList)
	};
}

