import { useAppSelector } from './useAppSelector';
import { useAppDispatch, useEffectLoading } from '../modal/ryan-store';
import { useCallback } from 'react';
import { resume } from '../modal/resume';

export function useResume() {
	const resumeState = useAppSelector('resume');

	const dispatch = useAppDispatch();
	const effectLoading = useEffectLoading();

	const getResume = useCallback((payload: { user_id: number; }) => {
		return dispatch(resume.effects.getResume)(payload);
	}, [dispatch]);

	const getAdminResume = useCallback(() => {
		return dispatch(resume.effects.getAdminResume)();
	}, [dispatch]);

	const updateResume = useCallback((payload: Parameters<typeof resume.effects.updateResume>[1]) => {
		return dispatch(resume.effects.updateResume)(payload);
	}, [dispatch]);

	return {
		resumeState,
		getResume,
		getAdminResume,
		updateResume,
		updateResumeLoading: effectLoading(resume.effects.updateResume),
		getResumeLoading: effectLoading(resume.effects.getResume),
		getAdminResumeLoading: effectLoading(resume.effects.getAdminResume),
	};
}
