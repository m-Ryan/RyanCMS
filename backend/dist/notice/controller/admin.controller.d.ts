import { NoticeService } from '../service/notice.service';
import { CreateNoticeDto } from '../form/create_notice.dto';
import { Auth } from '../../common/interface/Auth';
export declare class AdminController {
    private readonly service;
    constructor(service: NoticeService);
    createAdminNoticeDto(createNoticeDto: CreateNoticeDto, auth: Auth): Promise<import("../entities/notice.entity").NoticeEntity>;
    createNoticeDto(createNoticeDto: CreateNoticeDto, auth: Auth): Promise<import("../entities/notice.entity").NoticeEntity>;
    getList(auth: Auth): Promise<import("../entities/notice.entity").NoticeEntity[]>;
    deleteNotice(auth: Auth, noticeId: number): Promise<{
        message: string;
        status: number;
    }>;
}
