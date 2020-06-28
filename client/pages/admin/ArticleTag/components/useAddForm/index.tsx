import React, { useMemo, useState, useCallback } from 'react';
import { message, Modal, Form, Input } from 'antd';
import styles from './index.module.scss';
import { useTag } from '@/client/selector/useTag';
import { useTagList } from '@/client/selector/useTagList';
import { Formik } from 'formik';
import { InputField, ImageUploaderField, TextAreaField } from '@/client/components/useValidateForm';


type Props = {
	tag_id: number;
	name: string;
	picture: string;
	desc: string;
};


const initFormData = {
	tag_id: 0,
	name: '',
	picture: '',
	desc: '',
}

export function useAddForm() {
	const [data, setData] = useState(initFormData);
	const [visible, setVisible] = useState(false);
	const { tagState, addTagLoading, addTag, updateTag, updateTagLoading } = useTag();
	const { getAdminList } = useTagList();

	const onSubmit = useCallback(async (form: Props) => {
		if (form.tag_id) {
			await updateTag(form);
			message.success('保存成功');
		} else {
			await addTag(form);
			message.success('添加成功');
		}
		getAdminList()
		setVisible(false);
	}, [addTag, getAdminList, updateTag]);


	const modal = useMemo(() => {
		return (
			<Formik key={data.tag_id} initialValues={data} onSubmit={onSubmit}>
				{
					({ handleSubmit }) => {
						return (
							<Modal
								title={tagState ? '编辑栏目' : '新增栏目'}
								visible={visible}
								onOk={() => handleSubmit()}
								okText="确定"
								cancelText="取消"
								onCancel={() => setVisible(false)}
								confirmLoading={addTagLoading || updateTagLoading}
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
	}, [addTagLoading, data, onSubmit, tagState, updateTagLoading, visible]);


	return {
		modal,
		open: (formData?: Props) => {
			setData({ ...initFormData, ...formData });
			setVisible(true)
		}
	};
}