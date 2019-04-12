import React, { PureComponent } from 'react';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import { Modal } from 'antd';
import { ReactAutoBind } from '../../util/decorators/reactAutoBind';
import { API } from '../../services/API';
import { catchError } from '../../util/decorators/catchError';
import Uploader from '../../util/uploader';
import { loading } from '../../util/decorators/loading';
import { qiNiuConfigModel } from '../../model';

interface State {
	crop: ReactCrop.Crop;
	mineType: string;
	src: string;
	croppedFile: Blob | null;
	loading: boolean;
}
interface Props {
	children: React.ReactNode;
	onSuccess: (url: string) => any;
	accept?: string;
}
const initState = {
	loading: false,
	croppedFile: null,
	mineType: 'image/png',
	src: '',
	crop: {
		aspect: 1,
		width: 50,
		height: 50,
		x: 0,
		y: 0
	}
};

@ReactAutoBind()
export class CustomImageCrop extends PureComponent<Props, State> {
	imageRef: HTMLImageElement;

	state: State = initState;

	async chooseImg() {
		const uploader = new Uploader({ autoUpload: false, count: 1, accept: this.props.accept });
		const files = (await uploader.chooseFile()) as File[];
		if (!files.length) return;
		const reader = new FileReader();
		reader.addEventListener('load', () => {
			if (reader.result) {
				this.setState({
					src: reader.result as string,
					mineType: files[0].type
				});
			}
		});
		reader.readAsDataURL(files[0]);
	}

	onImageLoaded = (image: HTMLImageElement, pixelCrop: ReactCrop.Crop) => {
		this.imageRef = image;
		const { crop } = this.state;

		if (crop.aspect && crop.height && crop.width) {
			this.setState({
				crop: { ...crop, height: 0 }
			});
		} else {
			this.makeClientCrop(crop, pixelCrop);
		}
	};

	onCropComplete = (crop: ReactCrop.Crop, pixelCrop: ReactCrop.Crop) => {
		this.makeClientCrop(crop, pixelCrop);
	};

	onCropChange = (crop: ReactCrop.Crop) => {
		this.setState({ crop });
	};

	async makeClientCrop(crop: ReactCrop.Crop, pixelCrop: ReactCrop.Crop) {
		if (this.imageRef && crop.width && crop.height) {
			const croppedFile = await this.getCroppedImg(this.imageRef, pixelCrop);
			this.setState({ croppedFile });
		}
	}

	getCroppedImg(image: HTMLImageElement, pixelCrop: ReactCrop.Crop): Promise<Blob> {
		const { mineType } = this.state;
		const canvas = document.createElement('canvas');
		canvas.width = pixelCrop.width!;
		canvas.height = pixelCrop.height!;
		const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
		ctx.drawImage(
			image,
			pixelCrop.x,
			pixelCrop.y,
			pixelCrop.width!,
			pixelCrop.height!,
			0,
			0,
			pixelCrop.width!,
			pixelCrop.height!
		);

		return new Promise((resolve, reject) => {
			canvas.toBlob((blob) => {
				if (blob) {
					resolve(blob);
				} else {
					reject('图片裁剪出错');
				}
			}, mineType);
		});
	}

	@catchError()
	@loading()
	async uploadCropImage() {
		const { croppedFile } = this.state;
		const qiNiuConfig = await qiNiuConfigModel.getConfig();
		const url = await API.upload.user.uploadByQiniu(croppedFile!, qiNiuConfig);
		this.props.onSuccess(url);
	}

	onCancel() {
		this.setState(initState);
	}

	render() {
		const { crop, src, loading } = this.state;
		const { children } = this.props;
		return (
			<div className="App">
				<Modal
					title={null}
					visible={!!src}
					onCancel={this.onCancel}
					onOk={this.uploadCropImage}
					maskClosable={false}
					cancelText="取消"
					okText="确定"
					centered
					confirmLoading={loading}
				>
					<ReactCrop
						src={src}
						crop={crop}
						style={{ width: '100%' }}
						imageStyle={{ width: '100%' }}
						onImageLoaded={this.onImageLoaded as any}
						onComplete={this.makeClientCrop}
						onChange={this.onCropChange}
					/>
				</Modal>
				<div onClick={this.chooseImg}>{children}</div>
			</div>
		);
	}
}
