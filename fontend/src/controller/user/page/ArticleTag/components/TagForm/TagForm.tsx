import React from 'react';
import { message, Modal } from 'antd';
import styles from './TagForm.module.scss';
import { Tag } from '../../../../../../interface/tag.interface';
import { InputItemProps, CustomForm, getFormValues } from '../../../../../../components/CustomForm/CustomForm';
import { validate } from '../../../../../../util/decorators/validator/validate';
import { loading } from '../../../../../../util/decorators/loading';
import { catchError } from '../../../../../../util/decorators/catchError';
import { notEmpty } from '../../../../../../util/decorators/validator/rules';
import { API } from '../../../../../../services/API';
import { ReactAutoBind } from '../../../../../../util/decorators/reactAutoBind';
import { ClearUnmountState } from '../../../../../../util/decorators/clearUnmountState';
interface Props {
	tag: Tag;
	visible: boolean;
	onCreated: (tag: Tag) => any;
	onUpdated: (tag: Tag) => any;
}

function getOptions(tag: Tag) {
	return [
		{
			name: 'name',
			placeholder: '请输入标签名称',
			type: 'text',
			className: styles['input-item'],
			value: tag.name,
			autoComplete: 'off',
			formItem: {
				label: <span>标签名称</span>,
				className: styles['label-item']
			}
		},
		{
			name: 'picture',
			type: 'picture',
			className: styles['input-item'],
			value: tag.picture,
			crop: true,
			formItem: {
				label: <span>封面图&emsp;</span>,
				className: styles['label-item']
			}
		},
		{
			name: 'desc',
			placeholder: '标签描述...',
			type: 'textarea',
			autosize: {
				minRows: 4,
				maxRows: 4
			},
			className: styles['input-item'],
			value: tag.desc,
			formItem: {
				label: <span>描述&emsp;&emsp;</span>,
				className: styles['label-item']
			}
		}
	];
}

interface State {
	options: Array<InputItemProps>;
	loading: boolean;
	visible: boolean;
}

@ReactAutoBind()
@ClearUnmountState()
export default class TagForm extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = {
			options: getOptions(props.tag),
			loading: false,
			visible: false
		};
	}

	callback = (value: string, item: InputItemProps) => {
		item.value = value;
		this.setState({
			options: [ ...this.state.options ]
		});
	};

	onSubmit = () => {
		const { name, desc, picture } = getFormValues(this.state.options);
		this.post(name, picture, desc);
	};

	@validate()
	@loading()
	@catchError()
	async post(@notEmpty('标题') name: string, @notEmpty('封面图') picture: string, desc: string) {
		const tag_id = this.props.tag.tag_id;
		if (!tag_id) {
			const tag = await API.tag.user.createTag(name, picture, desc);
			this.props.onCreated(tag);
			message.success('新建标签成功');
		} else {
			const tag = await API.tag.user.updateTag({ tag_id, name, picture, desc });
			this.props.onUpdated(tag);
			message.success('编辑标签成功');
		}
	}

	setModal() {
		this.setState({
			visible: !this.state.visible
		});
	}

	componentWillReceiveProps(nextProps: Props) {
		if (this.state.visible !== nextProps.visible) {
			this.setState({
				visible: nextProps.visible
			});
		}
		if (this.props.tag !== nextProps.tag) {
			this.setState({
				options: getOptions(nextProps.tag)
			});
		}
	}

	render() {
		const { loading, visible } = this.state;
		const { tag } = this.props;
		return (
			<Modal
				title={tag && tag.tag_id ? '编辑标签' : '新增标签'}
				visible={visible}
				onOk={this.onSubmit}
				okText="确定"
				cancelText="取消"
				onCancel={this.setModal}
				confirmLoading={loading}
			>
				<div className={styles['container']}>
					<CustomForm callback={this.callback} className={styles['form']} options={this.state.options} />
				</div>
			</Modal>
		);
	}
}
