import React, { useMemo, useState, useCallback } from 'react';
import { message, Modal, Form } from 'antd';
import styles from './index.module.scss';
import { useCategory } from '@/client/selector/useCategory';
import { useCategoryList } from '@/client/selector/useCategoryList';
import { Formik } from 'formik';
import { InputField, ImageUploaderField, TextAreaField } from '@/client/components/useValidateForm';

type Props = {
	category_id: number;
	name: string;
	picture: string;
	desc: string;
};

const initFormData = {
	category_id: 0,
	name: '',
	picture: '',
	desc: '',
};

export function useAddForm() {
	const [data, setData] = useState(initFormData);
	const [visible, setVisible] = useState(false);
	const { categoryState, addCategoryLoading, addCategory, updateCategory, updateCategoryLoading } = useCategory();
	const { getAdminList } = useCategoryList();


	const onSubmit = useCallback(async (form: Props) => {
		if (form.category_id) {
			await updateCategory(form);
			message.success('保存成功');
		} else {
			await addCategory(form);
			message.success('添加成功');
		}
		getAdminList();
		setVisible(false);
	}, [addCategory, getAdminList, updateCategory]);


	const modal = useMemo(() => {
		return (
			<Formik key={data.category_id} initialValues={data} onSubmit={onSubmit}>
				{
					({ handleSubmit }) => {
						return (
							<Modal
								title={categoryState ? '编辑栏目' : '新增栏目'}
								visible={visible}
								onOk={() => handleSubmit()}
								okText="确定"
								cancelText="取消"
								onCancel={() => setVisible(false)}
								confirmLoading={addCategoryLoading || updateCategoryLoading}
							>
								<div className={styles['container']}>
									<Form className={styles.form}>
									<InputField
												name="name"
												placeholder="请输入栏目名称"
												formItem={{ label: <>栏目名称</>, className: styles['input-item'] }}
											/>
										<ImageUploaderField
												count={1}
												name="picture"
												formItem={{ label:<>缩略图</> }}
											/>
										<TextAreaField
												name="desc"
												placeholder="栏目描述"
												formItem={{ label: <>栏目描述</>, className: styles['input-item'] }}
											/>
									</Form>
								</div>
							</Modal>
						);
					}
				}
			</Formik>
		);
	}, [addCategoryLoading, categoryState, data, onSubmit, updateCategoryLoading, visible]);


	return {
		modal,
		open: (formData?: Props) => {
			setData({ ...initFormData, ...formData });
			setVisible(true);
		}
	};
}