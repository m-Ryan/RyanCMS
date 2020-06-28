import { Button, message, Popconfirm, Modal, Popover } from 'antd';
import React, { useEffect, useState, useCallback } from 'react';
import styles from './index.module.scss';
import HeaderTitle from '@/client/components/HeaderTitle';
import { useTagList } from '@/client/selector/useTagList';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useAddForm } from './components/useAddForm';

export default function ArticleTag() {
	const { tagListState, getAdminList, deleteTag } = useTagList();

	const { modal, open } = useAddForm();

	useEffect(() => {
		getAdminList();
	}, [getAdminList]);

	const onDelete = useCallback(async (id: number) => {
		await deleteTag(id);
		message.success('删除成功');
	}, [deleteTag]);


	return (
		<div className={styles['container']}>
			<HeaderTitle
				title={'标签管理'}
				aside={
					<Button type="primary" onClick={() => open()}>
						添加标签
					</Button>
				}
			/>
			<div className={styles['list']}>
				{
					tagListState.list.map((item) => (
						<Popover
							key={item.tag_id}
							placement="right"
							overlayClassName={styles['popover']}
							title={
								<div className={styles['header']}>
									<span>标签：{item.name}</span>
									<span className={styles['btn-wrap']}>
										<EditOutlined onClick={() => open(item)} />
									&nbsp;
									<Popconfirm
											title="你确定要删除该标签吗?"
											onConfirm={() => onDelete(item.tag_id)}
											okText="确定"
											cancelText="取消"
										>
											<DeleteOutlined />
										</Popconfirm>
									</span>
								</div>
							}
							content={item.desc}
						>
							<Button className={styles['list-item']} type="primary" ghost>
								{item.name}
							</Button>
						</Popover>
					))
				}
			</div>

			{modal}
		</div>
	);
}
