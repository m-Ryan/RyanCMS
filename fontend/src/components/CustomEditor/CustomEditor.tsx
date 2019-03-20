import { Icon, Drawer, message, Popover, Tooltip } from 'antd';
import React from 'react';
import styles from './CustomEditor.module.scss';
import ReactMarkdown from 'react-markdown';
import LightCode from '../LightCode/LightCode';
import CustomUpload from '../CustomUpload/CustomUpload';
import { RcFile } from 'antd/lib/upload/interface';
import { GithubPicker, ColorResult } from 'react-color';
interface ToolOption {
	name: string;
	tip: string;
	icon: React.ReactNode;
	method: ()=> void;
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
		const instance = this.editor.current!;
		if (instance) {
			const beginPos = instance.selectionStart;
			const endPos = instance.selectionEnd;
			const value = instance.value;
			const scrollTop = instance.scrollTop;
			return {
				beginPos,
				endPos,
				value,
				instance,
				scrollTop
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
		const pic: string = `![图片1](${url})`;
		const { onChange } = this.props;
		const { beginPos, endPos, value, instance, scrollTop } = this.getEditorInstance();
		const newValue = value.slice(0, beginPos) + pic + value.slice(endPos);
		await onChange(newValue);
		message.destroy();
		instance.focus();
		instance.setSelectionRange(beginPos + pic.length, endPos + pic.length);
		instance.scrollTo(0, scrollTop);
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
		const { beginPos, endPos, value, instance, scrollTop } = this.getEditorInstance();
		const { onChange } = this.props;
		const link = '**' + value.slice(beginPos, endPos) + '**';
		const newValue = value.slice(0, beginPos) + `[${link}](链接地址)` + value.slice(endPos);

		await onChange(newValue);
		instance.focus();
		instance.setSelectionRange(beginPos + 9, endPos + 11);
		instance.scrollTo(0, scrollTop);
	};

	setBold = async () => {
		const { beginPos, endPos, value, instance, scrollTop } = this.getEditorInstance();
		const { onChange } = this.props;
		const boldText = '**' + value.slice(beginPos, endPos) + '**';
		const newValue = value.slice(0, beginPos) + boldText + value.slice(endPos);
		await onChange(newValue);
		instance.focus();
		instance.setSelectionRange(beginPos + 2, endPos + 2);
		instance.scrollTo(0, scrollTop);
	};

	setItalic = async () => {
		const { beginPos, endPos, value, instance, scrollTop } = this.getEditorInstance();
		const { onChange } = this.props;
		const italicText = '*' + value.slice(beginPos, endPos) + '*';
		const newValue = value.slice(0, beginPos) + italicText + value.slice(endPos);
		await onChange(newValue);
		instance.focus();
		instance.setSelectionRange(beginPos + 1, endPos + 1);
		instance.scrollTo(0, scrollTop);
	};

	setQuote = async () => {
		const { beginPos, endPos, value, instance, scrollTop } = this.getEditorInstance();
		const { onChange } = this.props;
		const quoteText = '\n > ' + value.slice(beginPos, endPos) + '\n';
		const newValue = value.slice(0, beginPos) + quoteText + value.slice(endPos);
		await onChange(newValue);
		instance.focus();
		instance.setSelectionRange(beginPos + quoteText.length, endPos + quoteText.length);
		instance.scrollTo(0, scrollTop);
	};

	setList = async () => {
		const { beginPos, endPos, value, instance, scrollTop } = this.getEditorInstance();
		const { onChange } = this.props;
		const listText = '- ' + value.slice(beginPos, endPos);
		const newValue = value.slice(0, beginPos) + listText + value.slice(endPos);
		await onChange(newValue);
		instance.focus();
		instance.setSelectionRange(newValue.length, newValue.length);
		instance.scrollTo(0, scrollTop);
	};

	setFontColor = async (colorResult: ColorResult) => {
		const { beginPos, endPos, value, instance, scrollTop} = this.getEditorInstance();
		const { onChange } = this.props;
		const listText = `<span style="color: ${colorResult.hex}">\n${value.slice(beginPos, endPos)}\n</span>`;
		const newValue = value.slice(0, beginPos) + listText + value.slice(endPos);
		await onChange(newValue);
		instance.focus();
		instance.setSelectionRange(newValue.length, newValue.length);
		instance.scrollTo(0, scrollTop);
	};

	setBgColor = async (colorResult: ColorResult) => {
		const { beginPos, endPos, value, instance, scrollTop } = this.getEditorInstance();
		const { onChange } = this.props;
		const listText = `<span style="background-color: ${colorResult.hex}">\n${value.slice(
			beginPos,
			endPos
		)}\n</span>`;
		const newValue = value.slice(0, beginPos) + listText + value.slice(endPos);
		await onChange(newValue);
		instance.focus();
		instance.setSelectionRange(newValue.length, newValue.length);
		instance.scrollTo(0, scrollTop);
	};

	setCode = async () => {
		const { beginPos, endPos, value, instance, scrollTop } = this.getEditorInstance();
		const { onChange } = this.props;
		const listText = `\n\`\`\`js\n${value.slice(
			beginPos,
			endPos
		)}\n\`\`\`\n`;
		const newValue = value.slice(0, beginPos) + listText + value.slice(endPos);
		await onChange(newValue);
		instance.focus();
		instance.setSelectionRange(newValue.length, newValue.length);
		instance.scrollTo(0, scrollTop);
	};

	getTools() {}

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

	public render() {
		const { className, style, height, value, onChange, tools, placeholder } = this.props;
		const { fullScreen, loading } = this.state;
		const toolsOption: ToolOption[] = [
			{
				name: 'bold',
				icon: <Icon type="bold" />,
				tip: '加粗',
				method: this.setBold
			},
			{
				name: 'italic',
				icon: <Icon type="italic" />,
				tip: '斜体',
				method: this.setItalic
			},
			{
				name: 'font-colors',
				icon: (
					<Popover
						content={<GithubPicker onChangeComplete={this.setFontColor} />}
						title={null}
						trigger="click"
					>
						<Icon type="font-colors" />
					</Popover>
				),
				tip: '字体颜色',
				method: () => {}
			},
			{
				name: 'bg-colors',
				icon: (
					<Popover content={<GithubPicker onChangeComplete={this.setBgColor} />} title={null} trigger="click">
						<Icon type="bg-colors" />
					</Popover>
				),
				tip: '背景颜色',
				method: () => {}
			},
			{
				name: 'link',
				icon: <Icon type="link" />,
				tip: '链接',
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
				tip: '图片',
				method: () => {}
			},
			{
				name: 'code',
				icon: <Icon type="code" />,
				tip: '代码块',
				method: this.setCode
			},
			{
				name: 'quote',
				icon: <Icon type="right" />,
				tip: '引用',
				method: this.setQuote
			},
			{
				name: 'ordered-list',
				icon: <Icon type="ordered-list" />,
				tip: '列表',
				method: this.setList
			},
			{
				name: 'full-screen',
				icon: <Icon type="fullscreen" />,
				tip: '全屏',
				method: this.setFullScreen
			}
		];

		const attributes = this.getAttribute(height, className, style);
		const editorContainer = (
			<div className={styles['editor']}>
				<div className={styles['editor-tool']}>
					{tools ? (
						toolsOption.filter((item) => tools.includes(item.name)).map((item) => (
							<a key={item.name} onClick={item.method} title={item.tip}>
								{item.icon}
							</a>
						))
					) : (
						toolsOption.map((item) => (
							<a key={item.name} onClick={item.method} title={item.tip}>
								{item.icon}
							</a>
						))
					)}
				</div>
				<div className={styles['editor-container']}>
					<div className={`${styles['editor-textarea-wrap']} ${fullScreen ? ' hidden-sm hidden-xs' : ''}`}>
						<textarea
							placeholder={placeholder}
							className={styles['editor-textarea']}
							ref={this.editor}
							value={value}
							onChange={(e) => onChange(e.target.value)}
						/>
					</div>
					<ReactMarkdown
						className={`${styles['editor-view']} ry-table ${fullScreen ? '' : ' hidden-sm hidden-xs'}`}
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
