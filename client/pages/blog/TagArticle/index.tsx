import React, { useEffect, useMemo } from 'react';
import styles from './index.module.scss';
import { useBlogger } from '@/client/selector/useBlogger';
import { articleList } from '@/client/modal/articleList';
import { useArticleList } from '@/client/selector/useArticleList';
import { useAppStore, useEffectLoading } from '@/client/modal/ryan-store';
import { useParams } from 'react-router-dom';
import { tagList } from '@/client/modal/tagList';
import { useTagList } from '@/client/selector/useTagList';
import { Link } from '@/client/components/Link';
import dayjs from 'dayjs';
import { Skeleton } from 'antd';
import { useDocumentTitle } from '@/client/hooks/useDocumentTitle';


export function TagArticle() {
	const { tag = '' } = useParams();
	const { bloggerState } = useBlogger();
	const { tagListState: { list }, getList } = useTagList();
	const { articleListState, getList: getArticleList } = useArticleList();
	const { endSSR } = useAppStore();
	const effectsLoading = useEffectLoading();
	useDocumentTitle(`标签-${tag}`);
	useEffect(() => {
		if (bloggerState) {
			getList({
				user_id: bloggerState.user_id,
			});
		};

	}, [bloggerState, getList]);

	const currentTag = useMemo(() => {
		return list.find(item => item.name === tag);
	}, [list, tag]);

	useEffect(() => {
		if (bloggerState && currentTag) {
			getArticleList({
				user_id: bloggerState.user_id,
				tag_id: currentTag.tag_id,
				page: 1,
				size: 9999
			})
				.then(endSSR);
		};

	}, [bloggerState, currentTag, endSSR, getArticleList]);

	const renderContent = useMemo(() => {
		if (effectsLoading(tagList.effects.getList, articleList.effects.getList)) {
			return <>
				<Skeleton active paragraph={{ rows: 1 }} />
				<Skeleton active paragraph={{ rows: 1 }} />
				<Skeleton active paragraph={{ rows: 1 }} />
				<Skeleton active paragraph={{ rows: 1 }} />
				<Skeleton active paragraph={{ rows: 1 }} />
				<Skeleton active paragraph={{ rows: 1 }} />
				<Skeleton active paragraph={{ rows: 1 }} />
				<Skeleton active paragraph={{ rows: 1 }} />
				<Skeleton active paragraph={{ rows: 1 }} />
			</>;
		}
		return <ul className={styles['list']}>
			{articleListState.list.map((item) => (
				<li className={styles['list-item']} key={item.article_id}>
					<Link type="blogger" to={`/a/${item.title}`}>
						<h3>
							<span className={styles['title']}>{item.title}</span>
							<span className={styles['date']}>
								{dayjs(item.created_at * 1000).format('YYYY-MM-DD')}
							</span>
						</h3>
					</Link>
				</li>
			))}
		</ul>;
	}, [articleListState.list, effectsLoading]);


	return (
		<div>
			<h3 className={styles.tagTitle}>{tag}</h3>
			{renderContent}
		</div>
	);
}
