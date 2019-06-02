import { Controller, Post, Body, Headers, Get, Query, UseGuards } from '@nestjs/common';
import { NoticeService } from '../service/notice.service';
import { CreateNoticeDto } from '../form/create_notice.dto';
import { Auth } from '../../common/interface/Auth';
import { ADMIN_RANK, USER_RANK } from '../../common/constant/User';
import { AdminGuard } from '../../common/guards/admin.guard';
@Controller('notice/admin')
@UseGuards(AdminGuard)
export class AdminController {
	constructor(private readonly service: NoticeService) {}

	@Post('/create-admin-notice')
	createAdminNoticeDto(@Body() createNoticeDto: CreateNoticeDto, @Headers('auth') auth: Auth) {
		const rank = ADMIN_RANK;
		return this.service.createNotice(createNoticeDto, rank, auth.user_id);
	}

	@Post('/create-notice')
	createNoticeDto(@Body() createNoticeDto: CreateNoticeDto, @Headers('auth') auth: Auth) {
		const rank = USER_RANK;
		return this.service.createNotice(createNoticeDto, rank, auth.user_id);
	}

	@Get('/list')
	async getList(@Headers('auth') auth: Auth) {
		const rank = ADMIN_RANK;
		return this.service.getList(auth.user_id, rank);
	}

	@Get('/delete-notice')
	async deleteNotice(@Headers('auth') auth: Auth, @Query('notice_id') noticeId: number) {
		return this.service.deleteNotice(auth.user_id, noticeId);
	}
}
