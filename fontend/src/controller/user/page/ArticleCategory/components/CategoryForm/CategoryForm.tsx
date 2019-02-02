import React from 'react';
import { message, Modal } from 'antd';
import styles from './CategoryForm.module.scss';
import { Category } from '../../../../../../interface/category.interface';
import { InputItemProps, CustomForm, getFormValues } from '../../../../../../components/CustomForm/CustomForm';
import { validate } from '../../../../../../util/decorators/validator/validate';
import { loading } from '../../../../../../util/decorators/loading';
import { catchError } from '../../../../../../util/decorators/catchError';
import { notEmpty } from '../../../../../../util/decorators/validator/rules';
import { API } from '../../../../../../services/API';
import { ReactAutoBind } from '../../../../../../util/decorators/reactAutoBind';
import { ClearUnmountState } from '../../../../../../util/decorators/clearUnmountState';
interface Props {
	category: Category;
	visible: boolean;
	onCreated: (category: Category) => any;
	onUpdated: (category: Category) => any;
}

function getOptions(category: Category) {
	return [
		{
			name: 'name',
			placeholder: '请输入栏目名称',
			type: 'text',
			className: styles['input-item'],
			value: category.name,
			formItem: {
				label: <span>栏目名称</span>,
				className: styles['label-item']
			}
		},
		{
			name: 'picture',
			type: 'picture',
			className: styles['input-item'],
			value: category.picture,
			crop: true,
			formItem: {
				label: <span>封面图&emsp;</span>,
				className: styles['label-item']
			}
		},
		{
			name: 'desc',
			placeholder: '栏目描述...',
			type: 'textarea',
			autosize: {
				minRows: 4,
				maxRows: 4
			},
			className: styles['input-item'],
			value: category.desc,
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
export default class CategoryForm extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = {
			options: getOptions(props.category),
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
		const category_id = this.props.category.category_id;
		if (!category_id) {
			const category = await API.category.user.createCategory(name, picture, desc);
			this.props.onCreated(category);
			message.success('新建栏目成功');
		} else {
			const category = await API.category.user.updateCategory({ category_id, name, picture, desc });
			this.props.onUpdated(category);
			message.success('编辑栏目成功');
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
		if (this.props.category !== nextProps.category) {
			this.setState({
				options: getOptions(nextProps.category)
			});
		}
	}

	render() {
		const { loading, visible } = this.state;
		const { category } = this.props;
		return (
			<Modal
				title={category && category.category_id ? '编辑栏目' : '新增栏目'}
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
