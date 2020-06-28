import React, { useCallback } from 'react';
import { Button, message, Form, } from 'antd';
import { Link } from '@/client/components/Link';
import styles from './index.module.scss';
import { InputField, ButtonField } from '@/client/components/useValidateForm';
import { Formik } from 'formik';
import * as yup from 'yup';
import { useUser } from '@/client/selector/useUser';

const schema = yup.object().shape({
	phone: yup.string().required('手机号不能为空').length(11, '手机号格式不对'),
	password: yup.string().required('密码不能为空').min(6, '密码不能少于六位'),
});

export function LoginForm() {

	const { login, loginLoading } = useUser();

	return (
		<div className={styles['container']}>
			<div className={styles['title']}>
				登录<span className={styles['tip']}>
					(没有账号？<Link to="/register">立即注册</Link>)
					</span>
			</div>
			<Formik validationSchema={schema} validateOnChange initialValues={{ phone: '', password: '' }} onSubmit={login}>
				<Form className={styles.form}>
					<InputField
						name="phone"
						placeholder="手机号"
						formItem={{
							label: <>手机号&emsp;</>,
							className: styles['input-item']
						}}
					/>
					<InputField
						name="password"
						type="password"
						placeholder="请输入密码"
						formItem={{
							label: <>密码&emsp;&emsp;</>,
							className: styles['input-item']
						}}
					/>
					<Form.Item >
						<div className={styles.submitBtn}>
							<ButtonField type="primary" loading={loginLoading}>
								登录
						</ButtonField>
						</div>
					</Form.Item>
				</Form>
			</Formik>
		</div>
	);
}