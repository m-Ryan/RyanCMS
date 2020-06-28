import { useStore } from 'react-redux';
import { AppStore } from './typing';

export function useAppStore() {
  return useStore() as AppStore;
}