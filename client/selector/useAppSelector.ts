import { useSelector } from 'react-redux';
import { AppState } from '../modal';

export function useAppSelector<T extends keyof AppState>(selector: T) {
  return useSelector<AppState, AppState[T]>(state => state[selector]);
}
