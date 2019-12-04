import { Controller, Get, Query, UseGuards, Post, Body, ParseIntPipe } from '@nestjs/common';
import { ToolsService } from '../service/index.service';
import { CreateJsonDto } from '../form/create_json.dto';
import { UpdateJsonDto } from '../form/update_json.dto';
@Controller('tools/visitor')
export class VisitorController {
	constructor(private readonly service: ToolsService) { }

	@Post('/add-json')
	async addJson(@Body() postDto: CreateJsonDto) {
		const data = new CreateJsonDto(postDto);
		await data.validate();
		return this.service.addJson(postDto.mod, postDto.name, postDto.content);
	}

	@Post('/update-json')
	async updateJson(@Body() postDto: UpdateJsonDto) {
		const data = new UpdateJsonDto(postDto);
		await data.validate();
		return this.service.updateJson(postDto.id, postDto.content);
	}

	@Get('/get-json')
	getJson(@Query('id', new ParseIntPipe()) id: number) {
		return this.service.getJson(id);
	}

	@Get('/get-json-list')
	getJsonList(@Query('page', new ParseIntPipe()) page: number, @Query('size', new ParseIntPipe()) size: number) {
		return this.service.getJsonList(page, size);
	}

	@Post('/delete-json')
	deleteJson(@Body() postDto: { id: number }) {
		return this.service.deleteJson(postDto.id);
	}

}
