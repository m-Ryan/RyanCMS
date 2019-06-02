import React from 'react';
import { Button, message } from 'antd';
import styles from './RegisterForm.module.scss';
import { CustomForm, InputItemProps, getFormValues, Trigger } from '@/components/CustomForm/CustomForm';
import {
	name,
	password,
	equal,
	checkName,
	checkPassword,
	checkEqual,
	phone,
	checkPhone
} from '@/util/decorators/validator/rules';
import { catchError } from '@/util/decorators/catchError';
import { RouterProps } from 'react-router';
import { loading } from '@/util/decorators/loading';
import { validate } from '@/util/decorators/validator/validate';
import { Link } from 'react-router-dom';
import { userModel } from '../../../../../../model';
const options = [
	{
		name: 'name',
		placeholder: '请输入用户名',
		type: 'text',
		className: styles['input-item'],
		value: '',
		formItem: {
			label: <span>姓名&emsp;&emsp;</span>,
			className: styles['label-item']
		},
		validator: {
			dataValid: (val: string) => checkName(val),
			trigger: [ Trigger.blur ]
		}
	},
	{
		name: 'phone',
		placeholder: '请输入手机号',
		type: 'text',
		maxLength: 11,
		className: styles['input-item'],
		value: '',
		formItem: {
			label: <span>手机号&emsp;</span>,
			className: styles['label-item']
		},
		validator: {
			dataValid: (val: string) => checkPhone(val),
			trigger: [ Trigger.blur ]
		}
	},
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

interface State {
	options: Array<InputItemProps>;
	loading: boolean;
}

interface Props extends RouterProps {}

export default class RegisterForm extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = {
			options: options,
			loading: false
		};
	}

	callback = (value: string, item: InputItemProps) => {
		item.value = value;
		this.setState({
			options: options
		});
	};

	onSubmit = () => {
		const options = getFormValues(this.state.options);
		this.register(options.name, options.phone, options.password, [ options.password, options.comfirmPassword ]);
	};

	@validate()
	@loading()
	@catchError()
	async register(
		@name() nickname: string,
		@phone() phone: string,
		@password() password: string,
		@equal('两次输入的密码') passwords: Array<string>
	) {
		this.setState({ loading: true });
		await userModel.postRegister({
			nickname,
			phone,
			password
		});
		message.success('注册成功，正在跳转');
		this.props.history.push('/admin');
	}

	render() {
		const { loading } = this.state;
		return (
			<div className={styles['container']}>
				<div className={styles['title']}>
					注册<span className={styles['tip']}>
						(已有账号？<Link to="/login">马上登陆</Link>)
					</span>
				</div>
				<CustomForm callback={this.callback} className={styles['form']} options={this.state.options}>
					<Button type="primary" onClick={this.onSubmit} loading={loading}>
						注册
					</Button>
				</CustomForm>
			</div>
		);
	}
}
