import React, { useCallback } from 'react';
import { Button, message } from 'antd';
import styles from './index.module.scss';
import { Formik } from 'formik';
import { Link } from '@/client/components/Link';
import { InputField, ButtonField } from '@/client/components/useValidateForm';
import { WhiteSpace } from '@/client/components/WhiteSpace';
import { useUser } from '@/client/selector/useUser';
import * as yup from 'yup';
import { useHistory } from 'react-router-dom';

const schema = yup.object().shape({
	nickname: yup.string().required('用户名不能为空').min(2, '用户名不能少于2位').max(10, '用户名不能多于于10位'),
	phone: yup.string().required('手机号不能为空').length(11, '手机号格式不对'),
	password: yup.string().required('密码不能为空').min(6, '密码不能少于六位'),
	comfirmPassword: yup.string().required('确认密码不能为空')
});


const initialValues = {
	nickname: '',
	phone: '',
	password: '',
	comfirmPassword: ''
};

export function RegisterForm() {
	const { registerLoading, register } = useUser();
	const history = useHistory();

	const onSubmit = useCallback(async (payload: Parameters<typeof register>[0]) => {
		register(payload);
	}, [register]);

	return (
		<Formik<typeof initialValues> validationSchema={schema} initialValues={initialValues} onSubmit={onSubmit}>{
			({ values, touched }) => {
				const isConfirm = values.password === values.comfirmPassword;
				return (
					<div className={styles['container']}>
						<div className={styles['title']}>
							注册<span className={styles['tip']}>(已有账号？<Link to="/login">马上登陆</Link>)</span>
						</div>
						<InputField name="nickname" formItem={{ className: styles['input-item'], label: <>姓名<WhiteSpace space={8} /></> }} />
						<InputField name="phone" formItem={{ className: styles['input-item'], label: <>手机号<WhiteSpace space={5} /></> }} />
						{/* 解决自动填充的问题 */}
						<div style={{ width: 0, height: 0, overflow: 'hidden' }}>
							<input value="hidden" onChange={() => { }} type="text" />
						</div>
						<InputField name="password" type="password" formItem={{ className: styles['input-item'], label: <>密码<WhiteSpace space={8} /></> }} />
						<InputField name="comfirmPassword" type="password" formItem={{
							className: styles['input-item'],
							label: <>确认密码<WhiteSpace space={1} /></>,
							validateStatus: isConfirm ? '' : 'error',
							help: !isConfirm && touched.comfirmPassword ? '两次输入的密码不一致' : undefined

						}} />
						<ButtonField disabled={!isConfirm} loading={registerLoading} type="primary"  >
							注册
						</ButtonField>

					</div>
				);
			}}</Formik>
	);
}