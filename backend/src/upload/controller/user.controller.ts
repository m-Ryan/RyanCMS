import {
	Controller,
	Get,
	Post,
	Body,
	Query,
	Next,
	Headers,
	UseGuards,
	ParseIntPipe,
	Req,
	Request,
	UseInterceptors,
	FileInterceptor,
	UploadedFile
} from '@nestjs/common';
import { UserGuard } from '../../common/guards/user.guard';
import { Auth } from '../../common/interface/Auth';
import { UploadService } from '../service/upload.service';
import { UserError } from '../../common/filters/userError';
import { Upload } from '../../util/upload';
import qiniu from 'qiniu';
import stream from 'stream';
import stringToStream from 'string-to-stream';

@Controller('upload/user')
export class UserController {
	constructor(private readonly uploadService: UploadService) {}

	@UseGuards(UserGuard)
	@UseInterceptors(FileInterceptor('file'))
	@Post('/image')
	updateTag(@UploadedFile() file: any, @Headers('auth') auth: Auth) {
		if (file.size > 2 * 1024 * 1024) {
			throw new UserError('上传图片不能大于2M');
		}
		return Upload.writeImage(file);
	}

	@UseGuards(UserGuard)
	@Get('/qiniu-token')
	getQiuNiuToken() {
		const { token, origin } = getQiniu();
		return {
			token,
			origin
		};
	}

	@Post('/upload-qiniu-file')
	uploadQiuNiuFile(@Body() fileData: { data: string; name: string }) {
		if (!fileData.data) {
			throw new UserError('文件数据不能为空');
		}
		if (!fileData.name) {
			throw new UserError('文件名不能为空');
		}
		const { token, origin, options } = getQiniu(fileData.name);

		// 创建可读流
		const readerStream = stringToStream(fileData.data);
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
}

function getQiniu(name?: string) {
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
