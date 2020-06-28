import { Button, Popconfirm, Popover, message } from 'antd';
import React, { useEffect, useCallback } from 'react';
import styles from './index.module.scss';
import HeaderTitle from '@/client/components/HeaderTitle';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useAddForm } from './components/useAddForm';
import { useCategoryList } from '@/client/selector/useCategoryList';

export default function ArticleCategory() {
	const { categoryListState, getAdminList, deleteCategory } = useCategoryList();

	const { modal, open } = useAddForm();

	useEffect(() => {
		getAdminList();
	}, [getAdminList]);

	const onDelete = useCallback(async (id: number) => {
		await deleteCategory(id);
		message.success('删除成功');
	}, [deleteCategory]);

	return (
		<div className={styles['container']}>
			<HeaderTitle
				title={'栏目管理'}
				aside={
					<Button type="primary" onClick={() => open()}>
						添加栏目
					</Button>
				}
			/>
			<div className={styles['list']}>
				{
					categoryListState.list.map((item) => (
						<Popover
							key={item.category_id}
							placement="right"
							overlayClassName={styles['popover']}
							title={
								<div className={styles['header']}>
									<span>栏目：{item.name}</span>
									<span className={styles['btn-wrap']}>
										<EditOutlined onClick={() => open(item)} />
									&nbsp;
									<Popconfirm
											title="你确定要删除该栏目吗?"
											onConfirm={() => onDelete(item.category_id)}
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
