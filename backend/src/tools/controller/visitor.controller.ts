import { Controller, Get, Query, UseGuards, Post, Body, ParseIntPipe } from '@nestjs/common';
import { UserGuard } from '../../common/guards/user.guard';
import { ToolsService } from '../service/index.service';
@Controller('tools/visitor')
export class UserController {
	constructor(private readonly service: ToolsService) {}

	@Post('/add-json')
	addJson(@Body() postDto: { content: string, mod: string, name: string }) {
		return this.service.addJson(postDto.mod, postDto.name, postDto.content);
	}

	@Post('/update-json')
	updateJson(@Body() postDto: { id: number, content: string }) {
		return this.service.updateJson(postDto.id, postDto.content);
	}

	getJson(@Query('id', new ParseIntPipe()) id: number) {
		return this.service.getJson(id);
	}

	getJsonList(@Query('page', new ParseIntPipe()) page: number, @Query('size', new ParseIntPipe()) size: number) {
		return this.service.getJsonList(page, size);
	}

	@Post('/delete-json')
	deleteJson(@Body() postDto: { id: number }) {
		return this.service.deleteJson(postDto.id);
	}

}
