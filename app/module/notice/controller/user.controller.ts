import { Controller, Get, Query, Headers, UseGuards, ParseIntPipe, Post, Body } from '@nestjs/common';
import { UserGuard } from '../../../common/guards/user.guard';
import { Auth } from '../../../common/interface/Auth';
import { NoticeService } from '../service/notice.service';
import { USER_RANK } from '../../../common/constant/User';
import { CreateNoticeDto } from '../form/create_notice.dto';

@Controller('notice/user')
@UseGuards(UserGuard)
export class UserController {
	constructor(private readonly service: NoticeService) { }

	@Get('/list')
	async getList(@Headers('auth') auth: Auth) {
		const rank = USER_RANK;
		return this.service.getList(auth.user_id, rank);
	}

	@Get('/set-read')
	async setNoticeRead(
		@Headers('auth') auth: Auth,
		@Query('notice_id', new ParseIntPipe())
		noticeId: number
	) {
		return this.service.setNoticeRead(noticeId, auth.user_id);
	}

	@Get('/set-all-read')
	async setAllNoticeRead(@Headers('auth') auth: Auth) {
		return this.service.setAllNoticeRead(auth.user_id);
	}
}
