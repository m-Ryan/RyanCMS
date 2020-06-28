import React, { useEffect, useMemo, useState, useCallback } from 'react';
import { message, Tooltip, Form } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import styles from './index.module.scss';
import { useUser } from '@/client/selector/useUser';
import { WhiteSpace } from '@/client/components/WhiteSpace';
import { Formik } from 'formik';
import { InputField, TextAreaField, ImageUploaderField, ButtonField } from '@/client/components/useValidateForm';

interface Props {
	user_id: number;
	nickname: string;
	phone: string;
	avatar: string;
	intro: string;
	domain: string;
	sex: number;
}

export function UserSettingForm() {

	const [data, setData] = useState({
		user_id: 0,
		nickname: '',
		phone: '',
		avatar: '',
		intro: '',
		domain: '',
		sex: 1,
	});

	const { userState, updateInfoLoading, updateInfo } = useUser();

	useEffect(() => {
		if (userState) {
			setData(userState);
		}
	}, [setData, userState]);


	const onSubmit = useCallback(async (form: Props) => {
		await updateInfo(form);
		message.success('更新成功');
	}, [updateInfo]);

	return (
		<Formik key={data.user_id} initialValues={data} onSubmit={onSubmit}>
			{
				() => {
					return (
						<div className={styles.container}>
							<Form className={styles.form}>
								<InputField
									name="nickname"
									placeholder="用户名"
									formItem={{ label: <>用户名<WhiteSpace space={2} /></>, className: styles['input-item'] }}
								/>
								<InputField
									name="phone"
									placeholder="手机号"
									formItem={{ label: <>手机号<WhiteSpace space={2} /></>, className: styles['input-item'] }}
								/>
								<ImageUploaderField
									name="avatar"
									formItem={{ label: <>缩略图<WhiteSpace space={2} /></> }}
								/>
								<TextAreaField
									name="intro"
									placeholder="介绍"
									formItem={{ label: <>个人介绍</>, className: styles['input-item'] }}
								/>
								<InputField
									name="concat.email"
									placeholder="email"
									formItem={{ label: <>email<WhiteSpace space={6} /></>, className: styles['input-item'] }}
								/>
								<InputField
									name="concat.github"
									placeholder="github"
									formItem={{ label: <>github<WhiteSpace space={4} /></>, className: styles['input-item'] }}
								/>
								<InputField
									name="concat.zhihu"
									placeholder="知乎"
									formItem={{ label: <>知乎<WhiteSpace space={6} /></>, className: styles['input-item'] }}
								/>
								<InputField
									name="concat.weibo"
									placeholder="微博"
									formItem={{ label: <>微博<WhiteSpace space={6} /></>, className: styles['input-item'] }}
								/>
								<InputField
									name="domain"
									placeholder="可通过nginx映射到绑定域名下"
									formItem={{
										label:
											<>
												域名绑定<WhiteSpace space={2} />
												<Tooltip
													title={
														<div>
															绑定域名后，可通过nginx映射到绑定域名下，详情查看<WhiteSpace space={2} />
															<a target="_blank" href="https://github.com/m-Ryan/RyanCMS">README.md</a>
														</div>
													}
												>
													<QuestionCircleOutlined />
												</Tooltip>
											</>, className: styles['input-item']
									}}
								/>
							</Form>
							<ButtonField type="primary" loading={updateInfoLoading}>
								更新
							</ButtonField>
						</div>
					);
				}
			}
		</Formik>
	);
}