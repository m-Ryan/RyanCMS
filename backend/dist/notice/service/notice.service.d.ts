import { NoticeEntity } from '../entities/notice.entity';
import { CreateNoticeDto } from '../form/create_notice.dto';
export declare class NoticeService {
    constructor();
    createNotice(createNoticeDto: CreateNoticeDto, rank: number, userId: number): Promise<NoticeEntity>;
    getList(userId: number, rank: number): Promise<NoticeEntity[]>;
    setNoticeRead(noticeId: number, userId: number): Promise<{
        message: string;
        status: number;
    }>;
    setAllNoticeRead(userId: number): Promise<{
        message: string;
        status: number;
    }>;
    deleteNotice(noticeId: number, userId: number): Promise<{
        message: string;
        status: number;
    }>;
}
