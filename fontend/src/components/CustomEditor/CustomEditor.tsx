import { Icon, Drawer, message, Popover, Tooltip } from 'antd';
import React from 'react';
import styles from './CustomEditor.module.scss';
import ReactMarkdown from 'react-markdown';
import LightCode from '../LightCode/LightCode';
import { RcFile } from 'antd/lib/upload/interface';
import { GithubPicker, ColorResult } from 'react-color';
import Uploader from '../../util/uploader';
import { API } from '../../services/API';
import { qiNiuConfigModel } from '../../model';
interface ToolOption {
	name: string;
	tip: string;
	icon: (disable: boolean) => React.ReactNode;
	method: (item?: ToolOption) => void;
	disabled: boolean;
}
interface Props {
	height: string;
	className?: string;
	style?: object;
	initValue: string;
	tools?: string[];
	uploadAddress?: string;
	placeholder?: string;
	onChange: (value: string) => Promise<any>;
}

interface Step {
	value: string;
	selectionRangeBegin: number;
	selectionRangeEnd: number;
	scrollTop: number;
	type: StepType;
}

interface State {
	value: string;
	fullScreen: boolean;
	loading: boolean;
	history: Step[];
	step: number;
	toolOptions: ToolOption[];
}

enum StepType {
	Text,
	Source,
	Picture,
	Italic,
	Bold,
	Link,
	Quote,
	List,
	FontColor,
	BgColor,
	Code
}

function createStep(value: string, type: StepType = StepType.Text) {
	return {
		value,
		selectionRangeBegin: 0,
		selectionRangeEnd: 0,
		scrollTop: 0,
		type
	};
}

export default class CustomEditor extends React.Component<Props, State> {
	editor: React.RefObject<HTMLTextAreaElement>;
	constructor(props: Props) {
		super(props);
		this.editor = React.createRef();
		this.state = {
			value: props.initValue,
			toolOptions: this.getToolOptionss(),
			fullScreen: false,
			loading: false,
			history: [ createStep(props.initValue, StepType.Source) ],
			step: 0
		};
		this.onPaste = this.onPaste.bind(this);
	}

	onPaste = async (e: React.ClipboardEvent<HTMLTextAreaElement>) => {
		const clipboardData = e.clipboardData!;

		for (let i = 0; i < clipboardData.items.length; i++) {
			const item = clipboardData.items[i];
			if (item.kind == 'file') {
				const blob = item.getAsFile();

				if (!blob || blob.size === 0) {
					return;
				}
				message.loading('正在上传粘贴图片');
				const qiniuConfig = await qiNiuConfigModel.getConfig();
				const url = await API.upload.user.uploadByQiniu(blob, qiniuConfig);
				if (!this.editor.current) return;
				const pic: string = `\n![图片1](${url})\n`;
				const { beginPos, endPos, value, scrollTop } = this.getEditorInstance();
				const newValue = value.slice(0, beginPos) + pic + value.slice(endPos);

				const selectionRangeBegin = beginPos + pic.length;
				const selectionRangeEnd = endPos + pic.length;
				this.putStep({
					value: newValue,
					selectionRangeBegin,
					selectionRangeEnd,
					scrollTop,
					type: StepType.Picture
				});
				message.destroy();
			}
		}
	};

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

	checkStep() {
		let { history, toolOptions, step } = this.state;
		const { onChange } = this.props;
		const instance = this.editor.current!;
		const redoItem = toolOptions.filter((item) => item.name === 'redo')[0];
		const undoItem = toolOptions.filter((item) => item.name === 'undo')[0];
		if (step > 0) {
			undoItem.disabled = false;
		} else {
			undoItem.disabled = true;
		}
		if (step < history.length - 1) {
			redoItem.disabled = false;
		} else {
			redoItem.disabled = true;
		}
		const current = history[step];
		const value = current.value;
		this.setState(
			{
				toolOptions: [ ...toolOptions ],
				value
			},
			() => {
				instance.focus();
				instance.scrollTo(0, current.scrollTop);
				instance.setSelectionRange(current.selectionRangeBegin, current.selectionRangeEnd);
			}
		);

		onChange(value);
	}

	putStep(data: Step) {
		let { history, step } = this.state;
		history = history.slice(0, this.state.step + 1); // 撤回过程中有新操作，就丢掉redo

		const lastHistory = history[step];
		let newStep = step;
		// 合并前后文本操作
		if (lastHistory.type === data.type && data.type === StepType.Text) {
			if (lastHistory.value.endsWith('\n')) {
				history.push(data);
				newStep += 1;
			} else {
				Object.assign(lastHistory, data);
			}
		} else {
			history.push(data);
			newStep += 1;
		}

		this.setState(
			{
				history: [ ...history ],
				step: newStep,
				value: data.value
			},
			this.checkStep
		);
	}

	setRedo = async (item: ToolOption) => {
		if (item.disabled) {
			this.checkStep();
			return;
		}
		const { step } = this.state;

		const newStep = step + 1;
		this.setState({ step: newStep }, this.checkStep);
	};

	setUndo = async (item: ToolOption) => {
		if (item.disabled) {
			this.checkStep();
			return;
		}
		const { step } = this.state;
		const newStep = step - 1;
		this.setState({ step: newStep }, this.checkStep);
	};

	setStoreVale = (value: string) => {};

	beforeUpload = (file: RcFile, fileList: RcFile[]) => {
		message.loading('正在上传图片..', 0);
		return true;
	};

	setPic = async (item: ToolOption) => {
		if (item.disabled) return;
		const upload = new Uploader({ count: 1, accept: 'images/*' });
		item.disabled = true;
		this.setState({
			toolOptions: [ ...this.state.toolOptions ]
		});
		try {
			const urls = await upload.chooseFile();
			if (!urls.length) {
				item.disabled = false;
				this.setState({
					toolOptions: [ ...this.state.toolOptions ]
				});
				return;
			}
			const pic: string = `\n![图片1](${urls[0]})\n`;
			const { beginPos, endPos, value, scrollTop } = this.getEditorInstance();
			const newValue = value.slice(0, beginPos) + pic + value.slice(endPos);

			message.destroy();
			const selectionRangeBegin = beginPos + pic.length;
			const selectionRangeEnd = endPos + pic.length;
			this.putStep({
				value: newValue,
				selectionRangeBegin,
				selectionRangeEnd,
				scrollTop,
				type: StepType.Picture
			});
			item.disabled = false;
			this.setState({
				toolOptions: [ ...this.state.toolOptions ]
			});
		} catch (error) {
			message.error(error.message);
			item.disabled = false;
			this.setState({
				toolOptions: [ ...this.state.toolOptions ]
			});
		}
	};

	uploadPicError = (errMsg: string) => {
		message.error(errMsg);
		this.setState({
			loading: false
		});
	};

	setLink = async () => {
		const { beginPos, endPos, value, scrollTop } = this.getEditorInstance();
		const link = value.slice(beginPos, endPos);
		const newValue = value.slice(0, beginPos) + `[${link}](链接地址)` + value.slice(endPos);

		const selectionRangeBegin = beginPos + link.length + 3;
		const selectionRangeEnd = beginPos + link.length + 7;
		this.putStep({
			value: newValue,
			selectionRangeBegin,
			selectionRangeEnd,
			scrollTop,
			type: StepType.Link
		});
	};

	onInputChange = (value: string) => {
		const { beginPos, endPos, scrollTop } = this.getEditorInstance();
		const selectionRangeBegin = beginPos;
		const selectionRangeEnd = endPos;
		this.putStep({
			value,
			selectionRangeBegin,
			selectionRangeEnd,
			scrollTop,
			type: StepType.Text
		});
	};

	setBold = async () => {
		const { beginPos, endPos, value, scrollTop } = this.getEditorInstance();
		const boldText = '**' + value.slice(beginPos, endPos) + '**';
		const newValue = value.slice(0, beginPos) + boldText + value.slice(endPos);

		const selectionRangeBegin = beginPos + 2;
		const selectionRangeEnd = endPos + 2;
		this.putStep({
			value: newValue,
			selectionRangeBegin,
			selectionRangeEnd,
			scrollTop,
			type: StepType.Bold
		});
	};

	setItalic = async () => {
		const { beginPos, endPos, value, scrollTop } = this.getEditorInstance();
		const italicText = '*' + value.slice(beginPos, endPos) + '*';
		const newValue = value.slice(0, beginPos) + italicText + value.slice(endPos);

		const selectionRangeBegin = beginPos + 1;
		const selectionRangeEnd = endPos + 1;
		this.putStep({
			value: newValue,
			selectionRangeBegin,
			selectionRangeEnd,
			scrollTop,
			type: StepType.Italic
		});
	};

	setQuote = async () => {
		const { beginPos, endPos, value, scrollTop } = this.getEditorInstance();
		const beginText = '\n > ';
		const quoteText = beginText + value.slice(beginPos, endPos) + '\n';
		const newValue = value.slice(0, beginPos) + quoteText + value.slice(endPos);

		const selectionRangeBegin = beginPos + beginText.length;
		const selectionRangeEnd = endPos + beginText.length;
		this.putStep({
			value: newValue,
			selectionRangeBegin,
			selectionRangeEnd,
			scrollTop,
			type: StepType.Quote
		});
	};

	setList = async () => {
		const { beginPos, endPos, value, scrollTop } = this.getEditorInstance();
		const beginText = '\n- ';
		const selectdText = beginText + value.slice(beginPos, endPos);
		const newValue = value.slice(0, beginPos) + selectdText + value.slice(endPos);

		const selectionRangeBegin = beginPos + beginText.length;
		const selectionRangeEnd = endPos + beginText.length;
		this.putStep({
			value: newValue,
			selectionRangeBegin,
			selectionRangeEnd,
			scrollTop,
			type: StepType.List
		});
	};

	setFontColor = async (colorResult: ColorResult) => {
		const { beginPos, endPos, value, scrollTop } = this.getEditorInstance();
		const beginText = `\n\n<span style="color: ${colorResult.hex}">\n`;
		const endText = `\n</span>\n\n`;
		const selectdText = `${beginText + value.slice(beginPos, endPos) + endText}`;
		const newValue = value.slice(0, beginPos) + selectdText + value.slice(endPos);

		const selectionRangeBegin = beginPos + beginText.length;
		const selectionRangeEnd = endPos + beginText.length;
		this.putStep({
			value: newValue,
			selectionRangeBegin,
			selectionRangeEnd,
			scrollTop,
			type: StepType.FontColor
		});
	};

	setBgColor = async (colorResult: ColorResult) => {
		const { beginPos, endPos, value, scrollTop } = this.getEditorInstance();
		const beginText = `\n\n<span style="background-color: ${colorResult.hex}">\n`;
		const endText = `\n</span>\n\n`;
		const selectdText = `${beginText + value.slice(beginPos, endPos) + endText}`;
		const newValue = value.slice(0, beginPos) + selectdText + value.slice(endPos);
		const selectionRangeBegin = beginPos + beginText.length;
		const selectionRangeEnd = endPos + beginText.length;
		this.putStep({
			value: newValue,
			selectionRangeBegin,
			selectionRangeEnd,
			scrollTop,
			type: StepType.BgColor
		});
	};

	setCode = async () => {
		const { beginPos, endPos, value, scrollTop } = this.getEditorInstance();
		const beginText = `\n\`\`\`js\n`;
		const endText = `\n\`\`\`\n`;
		const selectdText = `${beginText + value.slice(beginPos, endPos) + endText}`;
		const newValue = value.slice(0, beginPos) + selectdText + value.slice(endPos);

		const selectionRangeBegin = beginPos + beginText.length;
		const selectionRangeEnd = endPos + beginText.length;
		this.putStep({
			value: newValue,
			selectionRangeBegin,
			selectionRangeEnd,
			scrollTop,
			type: StepType.Code
		});
	};

	getTools() {}

	setFullScreen = (item: ToolOption) => {
		const { fullScreen, toolOptions } = this.state;
		item.disabled = !fullScreen;
		this.setState({ fullScreen: !fullScreen, toolOptions: [ ...toolOptions ] });
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

	getToolOptionss() {
		const initOptions = [
			{
				name: 'bold',
				icon: (disable: boolean) => <Icon type="bold" />,
				tip: '加粗',
				disabled: false,
				method: this.setBold
			},
			{
				name: 'italic',
				icon: (disable: boolean) => <Icon type="italic" />,
				tip: '斜体',
				disabled: false,
				method: this.setItalic
			},
			{
				name: 'font-colors',
				icon: (disable: boolean) => (
					<Popover
						content={<GithubPicker triangle="hide" onChangeComplete={this.setFontColor} />}
						title={null}
						trigger="click"
					>
						<Icon type="font-colors" />
					</Popover>
				),
				tip: '字体颜色',
				disabled: false,
				method: () => {}
			},
			{
				name: 'bg-colors',
				icon: (disable: boolean) => (
					<Popover
						content={<GithubPicker triangle="hide" onChangeComplete={this.setBgColor} />}
						title={null}
						trigger="click"
					>
						<Icon type="bg-colors" />
					</Popover>
				),
				tip: '背景颜色',
				disabled: false,
				method: () => {}
			},
			{
				name: 'link',
				icon: (disabled: boolean) => <Icon type="link" />,
				tip: '链接',
				disabled: false,
				method: this.setLink
			},
			{
				name: 'picture',
				icon: (disabled: boolean) =>
					disabled ? <Icon type="picture" style={{ color: '#ddd' }} /> : <Icon type="picture" />,
				tip: '图片',
				disabled: false,
				method: this.setPic
			},
			{
				name: 'code',
				icon: (disabled: boolean) => <Icon type="code" />,
				tip: '代码块',
				disabled: false,
				method: this.setCode
			},
			{
				name: 'quote',
				icon: (disabled: boolean) => <Icon type="right" />,
				tip: '引用',
				disabled: false,
				method: this.setQuote
			},
			{
				name: 'ordered-list',
				icon: (disabled: boolean) => <Icon type="ordered-list" />,
				tip: '列表',
				disabled: false,
				method: this.setList
			},
			{
				name: 'undo',
				icon: (disabled: boolean) =>
					disabled ? <Icon type="undo" style={{ color: '#ddd' }} /> : <Icon type="undo" />,
				tip: '上一步',
				disabled: true,
				method: this.setUndo
			},
			{
				name: 'redo',
				icon: (disabled: boolean) =>
					disabled ? <Icon type="redo" style={{ color: '#ddd' }} /> : <Icon type="redo" />,
				tip: '下一步',
				disabled: true,
				method: this.setRedo
			},
			{
				name: 'full-screen',
				icon: (disabled: boolean) => (disabled ? <Icon type="fullscreen-exit" /> : <Icon type="fullscreen" />),
				tip: '全屏',
				disabled: false,
				method: this.setFullScreen
			}
		];
		return initOptions;
	}

	public render() {
		const { className, style, height, tools, placeholder } = this.props;
		const { fullScreen, toolOptions, value } = this.state;

		const attributes = this.getAttribute(height, className, style);
		const editorContainer = (
			<div className={styles['editor']}>
				<div className={styles['editor-tool']}>
					{tools ? (
						toolOptions.filter((item) => tools.includes(item.name)).map((item) => (
							<a key={item.name} onClick={() => item.method(item)} title={item.tip}>
								{item.icon(item.disabled)}
							</a>
						))
					) : (
						toolOptions.map((item) => (
							<a key={item.name} onClick={() => item.method(item)} title={item.tip}>
								{item.icon(item.disabled)}
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
							onPaste={this.onPaste}
							onChange={(e) => this.onInputChange(e.target.value)}
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
