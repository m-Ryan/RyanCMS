import React from 'react';
import CustomPreviewImage, { CustomPreviewImageProps } from '../CustomPreviewImage/CustomPreviewImage';
import CustomUpload from '../CustomUpload/CustomUpload';
import { Icon } from 'antd';
import styles from './CustomImageUpload.module.scss';
import 'react-image-crop/dist/ReactCrop.css';
import { ReactAutoBind } from '../../util/decorators/reactAutoBind';
import { UploadFileStatus } from 'antd/lib/upload/interface';
import { CustomLoading } from '../CustomLoading/CustomLoading';
import { CustomImageCrop } from '../CustomImageCrop/CustomImageCrop';
export interface CustomImageUploadProps extends CustomPreviewImageProps {
	onSuccess: (url: string) => void;
	url: string;
	onRemove: () => void;
	crop?: boolean;
}
interface State {
	loading: boolean;
}
@ReactAutoBind()
export default class CustomImageUpload extends React.Component<CustomImageUploadProps, State> {
	state: State = {
		loading: false
	};

	onChange(status: UploadFileStatus) {
		if (status === 'uploading') {
			this.setState({
				loading: true
			});
		} else {
			this.setState({
				loading: false
			});
		}
	}

	render() {
		const props = this.props;
		const { loading } = this.state;
		return (
			<div>
				{props.url ? (
					<CustomPreviewImage {...props} />
				) : (
					<React.Fragment>
						{props.crop ? (
							<CustomImageCrop onSuccess={props.onSuccess}>
								<div className={styles['upload-wrap']}>
									{loading ? (
										<CustomLoading />
									) : (
										<React.Fragment>
											<Icon type="plus" />
											<div className="ant-upload-text">Upload</div>
										</React.Fragment>
									)}
								</div>
							</CustomImageCrop>
						) : (
							<CustomUpload
								callbackStatus={this.onChange}
								accept="image/gif, image/jpg, image/jpeg, image/png"
								{...props}
								disabled={loading}
							>
								<div className={styles['upload-wrap']}>
									{loading ? (
										<CustomLoading />
									) : (
										<React.Fragment>
											<Icon type="plus" />
											<div className="ant-upload-text">Upload</div>
										</React.Fragment>
									)}
								</div>
							</CustomUpload>
						)}
					</React.Fragment>
				)}
			</div>
		);
	}
}
