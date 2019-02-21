import { Controller, Get, Query, ParseIntPipe } from '@nestjs/common';
import { AlbumService } from '../service/album.service';
import { UN_SECRET_STATUS } from '../../article/constance';
@Controller('album/visitor')
export class VisitorController {
	constructor(private readonly service: AlbumService) {}

	@Get('/list')
	async getList(
		@Query('page', new ParseIntPipe())
		page: number = 1,
		@Query('size', new ParseIntPipe())
		size: number = 10,
		@Query('user_id', new ParseIntPipe())
		userId: number
	) {
		const needRelations = true;
		const secret = UN_SECRET_STATUS; // 访客只能访问公开的
		return this.service.getList(page, size, userId, secret, needRelations);
	}
}
