import React from 'react';
import { Button, message, Icon, Tooltip } from 'antd';
import styles from './UserSettingForm.module.scss';

import {
	getFormValues,
	InputItemProps,
	CustomForm,
	Trigger,
	SwitchItemProps
} from '@/components/CustomForm/CustomForm';
import { checkPassword, checkEqual } from '@/util/decorators/validator/rules';
import { loading } from '@/util/decorators/loading';
import { catchError } from '@/util/decorators/catchError';
import { User } from '@/interface/user.interface';
import { ClearUnmountState } from '@/util/decorators/clearUnmountState';
import { ReactAutoBind } from '@/util/decorators/reactAutoBind';
import { UpdateUser } from '@/services/user';
import { History } from 'history';
import { userModel } from '../../../../../model';

interface State {
	options: Array<any>;
	concatOption: Array<any>;
	passwordOption: Array<any>;
	loading: boolean;
	isUpdatePassword: boolean;
	isUpdateConcat: boolean;
}

interface Props {
	user: User;
	history: History;
}

const passwordOption = [
	{
		name: 'password',
		placeholder: '6-36位密码',
		type: 'password',
		className: styles['input-item'],
		value: '',
		formItem: {
			label: <span>密码&emsp;&emsp;</span>,
			className: styles['label-item']
		},
		validator: {
			dataValid: (val: string, formValues: Array<string>) => checkPassword(val),
			trigger: [ Trigger.blur ]
		}
	},
	{
		name: 'comfirmPassword',
		placeholder: '确认密码',
		type: 'password',
		className: styles['input-item'],
		value: '',
		formItem: {
			label: <span>确认密码</span>,
			className: styles['label-item']
		},
		validator: {
			dataValid: (val: string, formValues: Array<string>) => {
				return checkPassword(val) && checkEqual([ val, formValues['password'] ]);
			},
			trigger: [ Trigger.change, Trigger.blur ]
		}
	}
];
@ClearUnmountState()
@ReactAutoBind()
export default class UserSettingForm extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);
		const user = props.user;
		const options = [
			{
				name: 'nickname',
				placeholder: '请输入用户名',
				type: 'text',
				className: styles['input-item'],
				value: user.nickname,
				formItem: {
					label: <span>用户名&emsp;</span>,
					className: styles['label-item']
				}
			},
			{
				name: 'phone',
				placeholder: '请输入手机号',
				type: 'text',
				className: styles['input-item'],
				value: user.phone,
				formItem: {
					label: <span>手机号&emsp;</span>,
					className: styles['label-item']
				}
			},
			{
				name: 'sex',
				type: 'radio',
				className: styles['input-item'],
				option: [
					{
						label: '男',
						value: 1
					},
					{
						label: '女',
						value: 0
					}
				],
				value: user.sex,
				formItem: {
					label: <span>性别&emsp;&emsp;</span>,
					className: styles['label-item']
				}
			},
			{
				name: 'avatar',
				type: 'picture',
				className: styles['input-item'],
				value: user.avatar,
				formItem: {
					label: <span>头像&emsp;&emsp;</span>,
					className: styles['label-item']
				}
			},
			{
				name: 'intro',
				placeholder: '这个人很懒，什么都没留下...',
				type: 'textarea',
				autosize: {
					minRows: 6,
					maxRows: 6
				},
				className: styles['intro-item'],
				value: user.intro,
				formItem: {
					label: <span>状态&emsp;&emsp;</span>,
					className: styles['label-item']
				}
			}
		];

		const concatOption = [
			{
				name: 'email',
				placeholder: 'email地址',
				type: 'text',
				className: styles['input-item'],
				value: user.concat.email,
				formItem: {
					label: <span>邮我地址&nbsp;</span>,
					className: styles['label-item']
				}
			},
			{
				name: 'github',
				placeholder: 'github地址',
				type: 'text',
				className: styles['input-item'],
				value: user.concat.github,
				formItem: {
					label: <span>github地址&nbsp;</span>,
					className: styles['label-item']
				}
			},
			{
				name: 'zhihu',
				placeholder: '知乎地址',
				type: 'text',
				className: styles['input-item'],
				value: user.concat.zhihu,
				formItem: {
					label: <span>zhihu地址&nbsp;</span>,
					className: styles['label-item']
				}
			},
			{
				name: 'weibo',
				placeholder: '微博地址',
				type: 'text',
				className: styles['input-item'],
				value: user.concat.weibo,
				formItem: {
					label: <span>weibo地址&nbsp;</span>,
					className: styles['label-item']
				}
			},
			{
				name: 'domain',
				placeholder: '可通过nginx映射到绑定域名下',
				type: 'text',
				className: styles['input-item'],
				value: user.domain,
				formItem: {
					label: (
						<span>
							域名绑定
							<Tooltip
								title={
									<div>
										绑定域名后，可通过nginx映射到绑定域名下，详情查看
										<a target="_blank" href="https://github.com/m-Ryan/RyanCMS">
											README.md
										</a>
									</div>
								}
							>
								<Icon type="question-circle" />
							</Tooltip>
							&nbsp;
						</span>
					),
					className: styles['label-item']
				}
			}
		];
		this.state = {
			options: options,
			passwordOption,
			concatOption,
			loading: false,
			isUpdatePassword: false,
			isUpdateConcat: false
		};
	}

	callback = (value: string, item: InputItemProps) => {
		item.value = value;
		this.setState({
			options: this.state.options
		});
	};

	@loading()
	@catchError()
	async onSubmit() {
		const options = getFormValues(this.state.options);
		const passwordOption = getFormValues(this.state.passwordOption);
		const concatOption = getFormValues(this.state.concatOption);
		const { isUpdatePassword, isUpdateConcat } = this.state;
		const { nickname, phone, intro, sex, avatar } = options;
		const { password, comfirmPassword } = passwordOption;
		let postData: UpdateUser = { nickname, phone, intro, sex, avatar };
		if (isUpdatePassword) {
			if (!checkPassword(password)) {
				return message.warn('请输入6-36位的密码');
			}
			if (password !== comfirmPassword) {
				return message.warn('两次输入的密码不一样');
			}
			postData.password = password;
		}

		if (isUpdateConcat) {
			postData = { ...postData, ...concatOption };
		}
		await userModel.postUpdate(postData);

		if (isUpdatePassword) {
			message.success('修改密码后需重新登录');
			this.props.history.push('/login');
		} else {
			message.success('更新成功');
		}
	}

	render() {
		const { loading, options, passwordOption, concatOption, isUpdatePassword, isUpdateConcat } = this.state;
		return (
			<div className={styles['container']}>
				<CustomForm callback={this.callback} className={styles['form']} options={options} />

				<CustomForm
					callback={(checked: boolean, item: SwitchItemProps) => this.setState({ isUpdatePassword: checked })}
					className={styles['form']}
					options={[
						{
							name: 'isUpdatePassword',
							type: 'switch',
							value: isUpdatePassword,
							formItem: {
								label: <span>修改密码</span>,
								className: styles['label-item']
							}
						}
					]}
				/>

				{isUpdatePassword && (
					<CustomForm callback={this.callback} className={styles['form']} options={passwordOption} />
				)}

				<CustomForm
					callback={(checked: boolean, item: SwitchItemProps) => this.setState({ isUpdateConcat: checked })}
					className={styles['form']}
					options={[
						{
							name: 'isUpdateConcat',
							type: 'switch',
							value: isUpdateConcat,
							formItem: {
								label: <span>更多信息</span>,
								className: styles['label-item']
							}
						}
					]}
				/>

				{isUpdateConcat && (
					<CustomForm callback={this.callback} className={styles['form']} options={concatOption} />
				)}
				<Button type="primary" onClick={this.onSubmit} loading={loading}>
					更新
				</Button>
			</div>
		);
	}
}
