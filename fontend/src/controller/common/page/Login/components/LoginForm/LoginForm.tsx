import React from 'react';
import { Button, message } from 'antd';
import styles from './LoginForm.module.scss';
import { RouterProps } from 'react-router';
import { validate } from '@/util/decorators/validator/validate';
import { phone, password } from '@/util/decorators/validator/rules';
import { loading } from '@/util/decorators/loading';
import { catchError } from '@/util/decorators/catchError';
import { Trigger, InputItemProps, getFormValues, CustomForm } from '@/components/CustomForm/CustomForm';
import { checkPhone, checkPassword } from '@/util/decorators/validator/rules';
import { Link } from 'react-router-dom';
import { userModel } from '../../../../../../model';

const options = [
	{
		name: 'phone',
		placeholder: '请输入手机号',
		type: 'text',
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
	}
];

interface State {
	options: Array<InputItemProps>;
	loading: boolean;
}

interface Props extends RouterProps {}
export default class LoginForm extends React.Component<Props, State> {
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
		this.login(options.phone, options.password);
	};

	@validate()
	@loading()
	@catchError()
	async login(@phone() phone: string, @password() password: string) {
		await userModel.postLogin({
			phone,
			password
		});
		this.props.history.push('/admin');
		message.success('登录成功，正在跳转');
	}

	render() {
		const { loading } = this.state;
		return (
			<div className={styles['container']}>
				<div className={styles['title']}>
					登录<span className={styles['tip']}>
						(没有账号？<Link to="/register">立即注册</Link>)
					</span>
				</div>
				<CustomForm callback={this.callback} className={styles['form']} options={this.state.options}>
					<Button type="primary" onClick={this.onSubmit} loading={loading}>
						登录
					</Button>
				</CustomForm>
			</div>
		);
	}
}
