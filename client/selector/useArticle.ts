import { useAppSelector } from './useAppSelector';
import { useAppDispatch, useEffectLoading } from '../modal/ryan-store';
import { useCallback } from 'react';
import { article } from '../modal/article';

export function useArticle() {
	const articleState = useAppSelector('article');
	const dispatch = useAppDispatch();
	const effectLoading = useEffectLoading();

	const updateArticle = useCallback((payload: Parameters<typeof article.effects.updateArticle>[1]) => {
		return dispatch(article.effects.updateArticle)(payload);
	}, [dispatch]);

	const createArticle = useCallback((payload: Parameters<typeof article.effects.createArticle>[1]) => {
		return dispatch(article.effects.createArticle)(payload);
	}, [dispatch]);

	const deleteArticle = useCallback((payload: Parameters<typeof article.effects.deleteArticle>[1]) => {
		return dispatch(article.effects.deleteArticle)(payload);
	}, [dispatch]);

	const getArticle = useCallback((payload: Parameters<typeof article.effects.getArticle>[1]) => {
		return dispatch(article.effects.getArticle)(payload);
	}, [dispatch]);

	const getAdminArticle = useCallback((payload: Parameters<typeof article.effects.getAdminArticle>[1]) => {
		return dispatch(article.effects.getAdminArticle)(payload);
	}, [dispatch]);

	const setArticle = useCallback((payload: Parameters<typeof article.reducers.setArticle>[1])=> {
		return dispatch(article.reducers.setArticle)(payload);
	}, [dispatch])

	return {
		articleState,
		setArticle,
		createArticle,
		updateArticle,
		deleteArticle,
		getArticle,
		getAdminArticle,
		createArticleLoading: effectLoading(article.effects.createArticle),
		getArticleLoading: effectLoading(article.effects.getArticle),
		getAdminArticleLoading: effectLoading(article.effects.getAdminArticle),
		updateArticleLoading: effectLoading(article.effects.updateArticle),
		deleteArticleLoading: effectLoading(article.effects.deleteArticle)
	};
}
