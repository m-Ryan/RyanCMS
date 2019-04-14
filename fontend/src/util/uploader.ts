import { API } from '../services/API';
import { message } from 'antd';
import { qiNiuConfigModel } from '../model';

const defaultOptions = {
	count: 1,
	autoUpload: true
};
interface Options {
	count?: number;
	accept?: string;
	minSize?: number;
	maxSize?: number;
	autoUpload?: boolean;
}
interface UploaderOption extends Options {
	count: number;
}
export default class Uploader {
	options: UploaderOption;
	el: HTMLInputElement;

	constructor(options: Options) {
		this.options = { ...defaultOptions, ...options };
		this.el = this.createInput();
	}

	private createInput() {
		Array.from(document.querySelectorAll('.uploader-form-input')).forEach((el) => {
			document.body.removeChild(el);
		});
		const el = document.createElement('input');
		el.className = 'uploader-form-input';
		el.type = 'file';
		el.style.display = 'block';
		el.style.opacity = '0';
		el.style.width = '0';
		el.style.height = '0';
		el.style.position = 'absolute';
		el.style.top = '0';
		el.style.left = '0';
		el.style.overflow = 'hidden';
		el.multiple = this.options.count > 1;
		if (this.options.accept) {
			el.accept = this.options.accept;
		}
		return el;
	}

	private onWindowBlurHandle() {}

	async onWindowBlur(resolve: any) {
		const checkFileCancel = async (repeatTime: number, resolve: Function): Promise<any> => {
			repeatTime -= 1;
			setTimeout(() => {
				if (repeatTime > 0 && !this.el.files!.length) {
					return checkFileCancel(repeatTime, resolve);
				} else if (repeatTime <= 0) {
					window.removeEventListener('focus', this.onWindowBlurHandle);
					resolve([]);
				}
				return;
			}, 50);
		};
		const MAX_REPEAT_TIME = 20;
		checkFileCancel(MAX_REPEAT_TIME, resolve);
	}

	chooseFile(): Promise<string[] | File[]> {
		let el = this.el;
		document.body.appendChild(el);
		el.click();

		return new Promise((resolve, reject) => {
			// 由于无法监听input file 取消事件
			this.onWindowBlurHandle = () => this.onWindowBlur(resolve);

			el.onchange = async (e: any) => {
				let files = e.target.files || [];
				files = Array.prototype.slice.call(files);
				if (files.length === 0) {
					return;
				}
				try {
					this.checkFile(files);
					if (this.options.autoUpload) {
						const urls = await this.uploadFiles(files);
						resolve(urls);
					} else {
						resolve(files);
					}
				} catch (err) {
					reject(err);
				}
				el.onchange = null;
				document.body.removeChild(el);
			};
			window.addEventListener('focus', this.onWindowBlurHandle);
		});
	}

	private async uploadFiles(files: File[]) {
		const results = files.map((file) => ({ file }));
		const urls: string[] = [];
		// 为保证progress事件的url是按上传顺序触发, 此处不能并行上传
		for (let result of results) {
			const url = await this.uploadFile(result);
			urls.push(url);
		}
		return urls;
	}

	private async uploadFile(result: { file: File }) {
		let url = '';
		try {
			const qiNiuConfig = await qiNiuConfigModel.getConfig();
			url = await API.upload.user.uploadByQiniu(result.file, qiNiuConfig);
		} catch (err) {
			message.error(err.message);
		}
		return url;
	}

	private checkFile(files: File[]) {
		const typeError = this.checkTypes(files);
		if (typeError) {
			throw new Error(typeError);
		}

		const sizeError = this.checkSize(files);
		if (sizeError) {
			throw new Error(sizeError);
		}
	}

	private checkTypes(files: File[]) {
		const accept = this.options.accept;
		if (accept) {
			let fileType = '';
			if (accept.indexOf('image') !== -1) {
				fileType = 'image';
			} else if (accept.indexOf('video') !== -1) {
				fileType = 'video';
			}
			for (let file of files) {
				if (file.type.indexOf(fileType) !== 0) {
					return '上传文件类型错误!';
				}
			}
		}
		return null;
	}

	private checkSize(files: File[]) {
		const options = this.options;
		for (let file of files) {
			if (options.minSize && file.size < options.minSize) {
				return `上传文件不能小于 ${options.minSize}`;
			}
			if (options.maxSize && file.size > options.maxSize) {
				return `上传文件不能小于 ${options.maxSize}`;
			}
		}
		return null;
	}
}
