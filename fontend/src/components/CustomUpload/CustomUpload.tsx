import * as React from 'react';
import { Upload, message } from 'antd';
import { UploadProps } from 'antd/lib/upload';
import { connect } from 'ryan-redux';
import { ReactAutoBind } from '../../util/decorators/reactAutoBind';
import { QiNiuConfig } from '../../services/upload/user';
import { UploadChangeParam, UploadFileStatus, RcFile } from 'antd/lib/upload/interface';
import { qiNiuConfigModel } from '../../model';
export interface CustomUploadProps extends UploadProps {
	accept: string;
	beforeUpload?: (file: RcFile, fileList: RcFile[]) => any;
	onLoading?: () => any;
	onSuccess: (file: string) => any;
	onError?: (error: string) => any;
	callbackStatus?: (status: UploadFileStatus) => any;
	children: React.ReactNode;
	minSize?: number;
	maxSize?: number;
	qiNiuConfig?: QiNiuConfig;
}

@connect(({ qiNiuConfig }: { qiNiuConfig: QiNiuConfig }) => ({ qiNiuConfig }))
@ReactAutoBind()
export default class CustomUpload extends React.Component<CustomUploadProps> {
	componentDidMount() {
		this.getQiNiuConfig();
	}
	async getQiNiuConfig() {
		let { qiNiuConfig } = this.props;
		if (!qiNiuConfig) {
			await qiNiuConfigModel.getConfig();
		}
	}

	onChange(info: UploadChangeParam) {
		const { onError, onSuccess, callbackStatus, qiNiuConfig, onLoading } = this.props;
		if (!qiNiuConfig) return;
		callbackStatus && callbackStatus(info.file.status as UploadFileStatus);
		if (info.file.status === 'done') {
			const { key } = info.file.response;
			const url = qiNiuConfig.origin + '/' + key;
			onSuccess(url);
		} else if (info.file.status === 'error') {
			if (onError) {
				onError(info.file.error.message);
			} else {
				message.error(info.file.error.message);
			}
		} else if (info.file.status === 'uploading') {
			onLoading && onLoading();
		}
	}

	beforeUpload(file: RcFile, fileList: RcFile[]) {
		const { accept } = this.props;
		let fileType = '';
		if (accept) {
			if (accept.indexOf('image') !== -1) {
				fileType = 'image';
			} else if (accept.indexOf('video') !== -1) {
				fileType = 'video';
			}
			if (file.type.indexOf(fileType) !== 0) {
				message.warn('上传文件类型错误!');
				return false;
			}
		}
		const { beforeUpload } = this.props;
		if (beforeUpload) {
			return beforeUpload(file, fileList);
		}
		return true;
	}

	render() {
		const { children, disabled = false, qiNiuConfig } = this.props;
		return (
			<Upload
				action="http://upload.qiniu.com"
				showUploadList={false}
				data={{
					token: qiNiuConfig && qiNiuConfig.token
				}}
				onChange={this.onChange}
				disabled={disabled}
				beforeUpload={this.beforeUpload}
			>
				{children}
			</Upload>
		);
	}
}
