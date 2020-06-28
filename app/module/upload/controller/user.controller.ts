import { Controller, Get, Post, Body, UseGuards, HttpService, Query } from '@nestjs/common';
import { UserGuard } from '../../../common/guards/user.guard';
import { UploadService } from '../service/upload.service';
import { getQiniu } from '../../../util/upload';
@Controller('upload/user')
export class UserController {
	constructor(
		private readonly uploadService: UploadService,
		private readonly service: HttpService
	) { }

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

	@Get('/upload-by-url')
	async uploadByUrl(@Query('url') url: string) {
		const { data } = await this.service.axiosRef.get(url, {
			responseType: 'arraybuffer',
		});
		return this.uploadService.uploadQiuNiuFile({ data });
	}
}
