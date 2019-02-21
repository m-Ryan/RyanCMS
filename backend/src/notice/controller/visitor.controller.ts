import { Controller, Get, Post, Body, Query, Next, Headers, UseGuards, ParseIntPipe } from '@nestjs/common';
import { NoticeService } from '../service/notice.service';

@Controller('notice/visitor')
export class VisitorController {
	constructor(private readonly service: NoticeService) {}
}
