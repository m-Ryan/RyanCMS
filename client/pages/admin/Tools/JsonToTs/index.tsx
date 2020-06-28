import React, { useState } from 'react';
import styles from './index.module.scss';
import { Formik } from 'formik';
import { TextAreaField, ButtonField } from '@/client/components/useValidateForm';
import services from '@/client/services';
import { message } from 'antd';

export default function JsonToTs() {
	const [resValue, setResValue] = useState('');

	const submit = async (value: string) => {
		if (!value) {
			return message.warning('内容不能为空');
		}
		try {
			const res = await services.tools.user.getJsonToInterface(value);
			setResValue(res);
		} catch (error) {
			message.error(error.message);
		}
	};

	return (
		<Formik initialValues={{ content: '' }} onSubmit={(values) => submit(values.content)}>
			{() => {
				return (
					<div className={styles['container']}>
						<TextAreaField
							placeholder="接口返回数据"
							name="content"
							rows={16}
						/>
						<div className={styles['btn-wrap']}>
							<ButtonField type="primary">
								提交
							</ButtonField>
						</div>

						{resValue && (
							<div className={styles['res-value']}>
								<code>{resValue}</code>
							</div>
						)}
					</div>
				);
			}}
		</Formik>
	);
}