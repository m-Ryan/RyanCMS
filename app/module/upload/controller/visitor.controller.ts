import { Controller, Get, Post, Body } from '@nestjs/common';
import { UploadService } from '../service/upload.service';
import { getQiniu } from '../../../util/upload';

@Controller('upload/visitor')
export class VisitorController {
	constructor(private readonly uploadService: UploadService) { }

	@Get('/qiniu-token')
	getQiuNiuToken() {
		const { token, origin } = getQiniu();
		return {
			token,
			origin
		};
	}

	@Post('/upload-qiniu-file')
	async uploadQiuNiuFile(@Body() fileData: { data: string; name: string }) {
		return this.uploadService.uploadQiuNiuFile(fileData);
	}
}
