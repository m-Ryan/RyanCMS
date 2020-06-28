import { useAppSelector } from './useAppSelector';

export function useConfig() {
	const configState = useAppSelector('config');

	return {
		configState,
	};
}
