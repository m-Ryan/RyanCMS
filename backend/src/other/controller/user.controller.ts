import { Controller, Get, Query, UseGuards, Post, Body } from '@nestjs/common';
import { UserGuard } from '../../common/guards/user.guard';
import { OtherService } from '../service/index.service';
@Controller('other/user')
@UseGuards(UserGuard)
export class UserController {
	constructor(private readonly service: OtherService) {}

	@Post('/get-json-to-ts')
	getTyping(@Body() data: string) {
		return this.service.getJsonToTs(data);
	}
}
