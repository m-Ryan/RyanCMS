import qs from 'qs';
import { useLocation } from 'react-router-dom';

export function useQuery() {
	const location = useLocation();
	return qs.parse(location.search, {
		ignoreQueryPrefix: true,
	}) as { [key: string]: string };
}
