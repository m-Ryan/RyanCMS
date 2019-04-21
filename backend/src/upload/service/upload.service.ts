import { Injectable, BadRequestException, HttpService, Post } from '@nestjs/common';
import qiniu from 'qiniu';
import TranformToReadStream from 'tranform-to-readstream';
import { UserError } from '../../common/filters/userError';
import { uploadQiuNiuFile } from '../../util/upload';
@Injectable()
export class UploadService {
	constructor() {}

	async uploadQiuNiuFile(fileData: { data: string; name: string }) {
		return uploadQiuNiuFile(fileData);
	}
}
