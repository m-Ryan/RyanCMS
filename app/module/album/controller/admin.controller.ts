import { Controller, Get, Query, Headers, UseGuards, ParseIntPipe } from '@nestjs/common';
import { AdminGuard } from '../../../common/guards/admin.guard';
import { AlbumService } from '../service/album.service';
@Controller('album/admin')
@UseGuards(AdminGuard)
export class AdminController {
	constructor(private readonly service: AlbumService) { }
}
