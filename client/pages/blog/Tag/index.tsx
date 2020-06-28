import React, { useEffect } from 'react';
import styles from './index.module.scss';
import { useAppDispatch, useAppStore } from '@/client/modal/ryan-store';
import { useBlogger } from '@/client/selector/useBlogger';
import { useRecordList } from '@/client/selector/useRecordList';
import { tagList } from '@/client/modal/tagList';
import { useTagList } from '@/client/selector/useTagList';
import { Link } from '@/client/components/Link';
import { Tag as ATag, Space } from 'antd';
import { useDocumentTitle } from '@/client/hooks/useDocumentTitle';

const colorBox = [
	'pink', 'red', 'yellow', 'orange', 'cyan', 'green', 'blue', 'purple', 'geekblue', 'magenta', 'volcano', 'gold', 'lime', 'success', 'processing', 'error', 'default', 'warning'
];

export function Tag() {

	const { bloggerState } = useBlogger();
	const { tagListState: { list }, getList } = useTagList();
	const { endSSR } = useAppStore();
	useDocumentTitle('标签');
	useEffect(() => {
		if (bloggerState) {
			getList({
				user_id: bloggerState.user_id,
			})
				.then(endSSR);
		};

	}, [bloggerState, endSSR, getList]);

	return (
		<div className={styles['container']}>
			{
				list.map(((item, index) => (
					<Link
						type="blogger"
						key={item.tag_id}
						to={`/tag/${item.name}`}
					>
						<ATag color={colorBox[index % colorBox.length]}>{item.name}（{item!.articlesCount}）</ATag>
					</Link>
				)))
			}
		</div>
	);
}