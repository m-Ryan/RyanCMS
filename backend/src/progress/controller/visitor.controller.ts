import { Controller, Get, Query, ParseIntPipe } from '@nestjs/common';
import { PhotoService } from '../service/photo.service';
@Controller('article/visitor')
export class VisitorController {
	constructor(private readonly service: PhotoService) {}
}
