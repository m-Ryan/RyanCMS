import { useAppSelector } from './useAppSelector';

export function useComment() {
  const commentState = useAppSelector('comment');

  return {
    commentState,
  };
}
