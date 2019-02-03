import { Icon, Drawer, message } from 'antd';
import React from 'react';
import styles from './CustomEditor.module.scss';
import ReactMarkdown from 'react-markdown';
import LightCode from '../LightCode/LightCode';
import CustomUpload from '../CustomUpload/CustomUpload';
import { RcFile } from 'antd/lib/upload/interface';

interface ToolOption {
	name: string;
	icon: React.ReactNode;
	method: any;
}
interface Props {
	height: string;
	className?: string;
	style?: object;
	value: string;
	tools?: string[];
	uploadAddress?: string;
	placeholder?: string;
	onChange: (value: string) => Promise<any>;
}

interface State {
	fullScreen: boolean;
	loading: boolean;
}
export default class CustomEditor extends React.Component<Props, State> {
	state: State = {
		fullScreen: false,
		loading: false
	};
	editor: React.RefObject<HTMLTextAreaElement>;
	constructor(props: Props) {
		super(props);
		this.editor = React.createRef();
	}

	getEditorInstance() {
		const instance = this.editor.current;
		if (instance) {
			const beginPos = instance.selectionStart;
			const endPos = instance.selectionEnd;
			const value = instance.value;
			return {
				beginPos,
				endPos,
				value,
				instance
			};
		} else {
			throw new Error('发生未知错误');
		}
	}

	beforeUpload = (file: RcFile, fileList: RcFile[]) => {
		message.loading('正在上传图片..', 0);
		return true;
	};

	setPic = async (url: string) => {
		const pic: string = `![图片1](${url}) \n\r`;
		const { onChange } = this.props;
		const { beginPos, endPos, value, instance } = this.getEditorInstance();
		const newValue = value.slice(0, beginPos) + pic + value.slice(endPos);
		await onChange(newValue);
		message.destroy();
		// instance.focus();
		// instance.setSelectionRange(beginPos + pic.length, endPos + pic.length);
		this.setState({
			loading: false
		});
	};

	uploadPicError = (errMsg: string) => {
		message.error(errMsg);
		this.setState({
			loading: false
		});
	};

	setLink = async () => {
		const { beginPos, endPos, value, instance } = this.getEditorInstance();
		const { onChange } = this.props;
		const link = '**' + value.slice(beginPos, endPos) + '**';
		const newValue = value.slice(0, beginPos) + `[${link}](链接地址)` + value.slice(endPos);

		await onChange(newValue);
		instance.focus();
		instance.setSelectionRange(beginPos + 9, endPos + 11);
	};

	setBold = async () => {
		const { beginPos, endPos, value, instance } = this.getEditorInstance();
		const { onChange } = this.props;
		const boldText = '**' + value.slice(beginPos, endPos) + '**';
		const newValue = value.slice(0, beginPos) + boldText + value.slice(endPos);
		await onChange(newValue);
		instance.focus();
		instance.setSelectionRange(beginPos + 2, endPos + 2);
	};

	setItalic = async () => {
		const { beginPos, endPos, value, instance } = this.getEditorInstance();
		const { onChange } = this.props;
		const italicText = '*' + value.slice(beginPos, endPos) + '*';
		const newValue = value.slice(0, beginPos) + italicText + value.slice(endPos);
		await onChange(newValue);
		instance.focus();
		instance.setSelectionRange(beginPos + 1, endPos + 1);
	};

	setQuote = async () => {
		const { beginPos, endPos, value, instance } = this.getEditorInstance();
		const { onChange } = this.props;
		const quoteText = '\n > ' + value.slice(beginPos, endPos) + '\n';
		const newValue = value.slice(0, beginPos) + quoteText + value.slice(endPos);
		await onChange(newValue);
		instance.focus();
		instance.setSelectionRange(beginPos + quoteText.length, endPos + quoteText.length);
	};

	setList = async () => {
		const { beginPos, endPos, value, instance } = this.getEditorInstance();
		const { onChange } = this.props;
		const listText = '- ' + value.slice(beginPos, endPos);
		const newValue = value.slice(0, beginPos) + listText + value.slice(endPos);
		await onChange(newValue);
		instance.focus();
		instance.setSelectionRange(newValue.length, newValue.length);
	};

	setFullScreen = () => {
		this.setState({ fullScreen: !this.state.fullScreen });
	};

	getAttribute(height: string, className?: string, style?: object) {
		const attributes = {
			style: {
				height
			}
		};
		if (className) {
			attributes['className'] = className;
		}
		if (style) {
			Object.assign(attributes.style, style);
		}
		return attributes;
	}

	getTools() {}

	public render() {
		const { className, style, height, value, onChange, tools, placeholder } = this.props;
		const { fullScreen, loading } = this.state;
		const toolsOption = [
			{
				name: 'bold',
				icon: <Icon type="bold" />,
				method: this.setBold
			},
			{
				name: 'italic',
				icon: <Icon type="italic" />,
				method: this.setItalic
			},
			{
				name: 'link',
				icon: <Icon type="link" />,
				method: this.setLink
			},
			{
				name: 'picture',
				icon: !loading ? (
					<CustomUpload
						accept="image/gif, image/jpg, image/jpeg, image/png"
						beforeUpload={this.beforeUpload}
						onSuccess={(url: string) => this.setPic(url)}
						onError={this.uploadPicError}
					>
						<Icon type="picture" />
					</CustomUpload>
				) : (
					<Icon type="picture" />
				),
				method: () => {}
			},
			{
				name: 'quote',
				icon: <Icon type="right" />,
				method: this.setQuote
			},
			{
				name: 'ordered-list',
				icon: <Icon type="ordered-list" />,
				method: this.setList
			},
			{
				name: 'full-screen',
				icon: <Icon type="fullscreen" />,
				method: this.setFullScreen
			}
		];

		const attributes = this.getAttribute(height, className, style);
		const editorContainer = (
			<div className={styles['editor']}>
				<div className={styles['editor-tool']}>
					{tools ? (
						toolsOption.filter((item) => tools.includes(item.name)).map((item) => (
							<a onClick={item.method} key={item.name}>
								{item.icon}
							</a>
						))
					) : (
						toolsOption.map((item) => (
							<a onClick={item.method} key={item.name}>
								{item.icon}
							</a>
						))
					)}
				</div>
				<div className={styles['editor-container']}>
					<div className={styles['editor-textarea-wrap']}>
						<textarea
							placeholder={placeholder}
							className={styles['editor-textarea']}
							ref={this.editor}
							value={value}
							onChange={(e) => onChange(e.target.value)}
						/>
					</div>
					<ReactMarkdown
						className={`${styles['editor-view']} ry-table`}
						source={value}
						renderers={{ code: LightCode as any }}
						escapeHtml={false}
					/>
				</div>
			</div>
		);
		return (
			<div {...attributes}>
				{editorContainer}
				<Drawer
					title="全屏编辑"
					placement="left"
					width={'100%'}
					visible={fullScreen}
					onClose={() => this.setState({ fullScreen: false })}
				>
					<div style={{ height: 'calc(100vh - 100px)' }}>{editorContainer}</div>
				</Drawer>
			</div>
		);
	}
}
