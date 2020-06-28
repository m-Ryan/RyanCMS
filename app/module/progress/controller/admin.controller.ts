import { Controller, Get, Query, Headers, UseGuards, ParseIntPipe } from '@nestjs/common';
import { AdminGuard } from '../../../common/guards/admin.guard';
import { PhotoService } from '../service/photo.service';
@Controller('article/admin')
@UseGuards(AdminGuard)
export class AdminController {
	constructor(private readonly service: PhotoService) { }
}
