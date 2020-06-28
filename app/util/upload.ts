import { UserError } from '../common/filters/userError';
import qiniu from 'qiniu';
import fs from 'fs';
import TranformToReadStream from 'tranform-to-readstream';

export function uploadQiuNiuFile(fileData: { data: string | Buffer; name?: string }) {
	if (!fileData.data) {
		throw new UserError('文件数据不能为空');
	}
	const { token, origin, options } = getQiniu(fileData.name);
	// 创建可读流
	const readerStream = new TranformToReadStream(fileData.data);
	const formUploader = new qiniu.form_up.FormUploader(options);
	const putExtra = new qiniu.form_up.PutExtra();
	return new Promise((resolve, reject) => {
		formUploader.putStream(
			token,
			fileData.name,
			readerStream,
			putExtra,
			(respErr, respBody: { key: string; hash: string }, respInfo) => {
				if (respErr) {
					throw respErr;
				}
				if (respInfo.statusCode === 200) {
					resolve(origin + '/' + respBody.key);
				} else {
					console.log(respInfo);
					throw new UserError('上传失败');
				}
			}
		);
	});
}

export function getQiniu(name?: string) {
	const accessKey = '2WAZdi48g5fLK3645nwy8FEb5_XaqYooOhh35AuG';
	const secretKey = 'XIKjs-HKSEiOusWztCRQ565KvDAcQRxHtY5ZO_xh';
	const mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
	const options = {
		scope: 'mryan'
	};
	if (name) {
		options.scope = 'mryan:' + name;
	}
	const putPolicy = new qiniu.rs.PutPolicy(options);
	const uploadToken = putPolicy.uploadToken(mac);
	return {
		token: uploadToken,
		origin: 'http://assets.maocanhua.cn',
		options
	};
}

export function fsReadAsync(
	path: string | number | Buffer,
	options?: {
		encoding?: null;
		flag?: string;
	}
): Promise<Buffer> {
	return new Promise((resolve, reject) => {
		return fs.readFile(path, options, (err, data: Buffer) => {
			if (err) {
				reject(err);
			}
			return resolve(data);
		});
	});
}

export function fsUnlinkAsync(path: string) {
	return new Promise((resolve, reject) => {
		fs.unlink(path, (err) => {
			if (err) {
				return reject(err);
			}
			return resolve();
		});
	});
}
