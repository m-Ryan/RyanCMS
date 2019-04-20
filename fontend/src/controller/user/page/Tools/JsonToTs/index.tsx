import React from 'react';
import styles from './index.module.scss';
import { Input, Button, message } from 'antd';
import { ReactAutoBind } from '@/util/decorators/reactAutoBind';
import { API } from '@/services/API';
import { loading } from '@/util/decorators/loading';
import { catchError } from '@/util/decorators/catchError';
interface Props {}
interface State {
	value: string;
	resValue: string;
}
const TextArea = Input.TextArea;

@ReactAutoBind()
export default class JsonToTs extends React.Component<Props, State> {
	state: State = {
		value: '',
		resValue: ''
	};

	@catchError()
	@loading()
	async submit() {
		const { value, resValue } = this.state;
		if (!value) {
			return message.warn('内容不能为空');
		}
		const res = await API.tools.user.getJsonToInterface(value);
		this.setState({
			resValue: res
		});
	}
	render() {
		const { value, resValue } = this.state;
		return (
			<div className={styles['container']}>
				<TextArea
					placeholder="接口返回数据"
					onChange={(e) => this.setState({ value: e.target.value })}
					value={value}
					rows={16}
				/>
				<div className={styles['btn-wrap']}>
					<Button type="primary" onClick={this.submit}>
						提交
					</Button>
				</div>

				{resValue && (
					<div className={styles['res-value']}>
						<code>{resValue}</code>
					</div>
				)}
			</div>
		);
	}
}
