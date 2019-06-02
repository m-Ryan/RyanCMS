import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { UserGuard } from '../../common/guards/user.guard';
import { UploadService } from '../service/upload.service';
import { getQiniu } from '../../util/upload';
@Controller('upload/user')
export class UserController {
	constructor(private readonly uploadService: UploadService) {}

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
	async uploadQiuNiuFile(@Body() fileData: { data: string; name: string }) {
		return this.uploadService.uploadQiuNiuFile(fileData);
	}
}
