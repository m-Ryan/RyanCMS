import { Injectable, BadRequestException, HttpService, Post } from '@nestjs/common';
import { uploadQiuNiuFile } from '../../util/upload';
@Injectable()
export class UploadService {
	constructor() {}

	async uploadQiuNiuFile(fileData: { data: string; name: string }) {
		return uploadQiuNiuFile(fileData);
	}
}
