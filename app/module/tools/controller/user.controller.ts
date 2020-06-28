import { Controller, Get, Query, UseGuards, Post, Body } from '@nestjs/common';
import { UserGuard } from '../../../common/guards/user.guard';
import { ToolsService } from '../service/index.service';
@UseGuards(UserGuard)
@Controller('tools/user')
export class UserController {
	constructor(private readonly service: ToolsService) { }

	@Post('/get-json-to-ts')
	getTyping(@Body() postDto: { data: string }) {
		return this.service.getJsonToTs(postDto.data);
	}
}
