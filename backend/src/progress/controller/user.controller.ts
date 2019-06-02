import { Controller, Get, Post, Body, Query, Next, Headers, UseGuards, Param, ParseIntPipe } from '@nestjs/common';
import { UserGuard } from '../../common/guards/user.guard';
import { PhotoService } from '../service/photo.service';
@Controller('article/user')
@UseGuards(UserGuard)
export class UserController {
	constructor(private readonly service: PhotoService) {}
}
