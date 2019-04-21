import { Controller, Get, Query, UseGuards, Post, Body } from '@nestjs/common';
import { UserGuard } from '../../common/guards/user.guard';
import { ToolsService } from '../service/index.service';
// @UseGuards(UserGuard)
@Controller('tools/user')
export class UserController {
	constructor(private readonly service: ToolsService) {}

	@Post('/get-json-to-ts')
	getTyping(@Body() postDto: { data: string }) {
		return this.service.getJsonToTs(postDto.data);
	}

	@Post('/get-pdf')
	getPDF(@Body() postDto: { data: string }) {
		return this.service.getPDF(postDto.data);
	}

	@Get('/get-pdf-page')
	getPagePDF(@Query('url') url: string) {
		return this.service.getPagePDF(url);
	}
}
