import { Button, Input, message, Skeleton } from 'antd';
import React, { useEffect, useCallback, useState } from 'react';
import styles from './IntroSetting.module.scss';
import HeaderTitle from '@/client/components/HeaderTitle';
import { useResume } from '@/client/selector/useResume';
import { MarkdownEditor } from '@/client/components/MarkdownEditor';

export default function IntroSetting() {
	const [content, setContent] = useState('');
	const { getAdminResume, getResumeLoading, updateResumeLoading, updateResume, resumeState } = useResume();

	useEffect(() => {
		getAdminResume();
	}, [getAdminResume]);

	useEffect(() => {
		if (resumeState) {
			setContent(resumeState.content);
		}
	}, [resumeState]);

	const onSubmit = useCallback(async () => {
		await updateResume({ content });
		message.success('更新成功');
	}, [content, updateResume]);

	return (
		<div className={styles['container']}>
			<HeaderTitle
				title="关于我的"
				aside={
					<Button loading={updateResumeLoading} type="primary" onClick={onSubmit}>
						提交
				</Button>
				}
			/>
			{
				getResumeLoading
					? <Skeleton />
					: <MarkdownEditor onChange={setContent} value={content} />
			}

		</div>
	);
}