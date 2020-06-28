import { Injectable } from '@nestjs/common';
import { NoticeEntity } from '../entities/notice.entity';
import { CreateNoticeDto } from '../form/create_notice.dto';
import { SuccessResponse } from '../../../common/filters/successResponse';
@Injectable()
export class NoticeService {
	constructor() { }

	createNotice(createNoticeDto: CreateNoticeDto, rank: number, userId: number) {
		return NoticeEntity.createNotice(createNoticeDto, rank, userId);
	}

	getList(userId: number, rank: number) {
		return NoticeEntity.getNewNoticeList(userId, rank);
	}

	async setNoticeRead(noticeId: number, userId: number) {
		await NoticeEntity.setNoticeRead(noticeId, userId);
		return SuccessResponse;
	}

	async setAllNoticeRead(userId: number) {
		await NoticeEntity.setAllNoticeRead(userId);
		return SuccessResponse;
	}

	async deleteNotice(noticeId: number, userId: number) {
		await NoticeEntity.deleteNotice(noticeId, userId);
		return SuccessResponse;
	}
}
