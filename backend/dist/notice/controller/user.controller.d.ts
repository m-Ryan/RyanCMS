import { Auth } from '../../common/interface/Auth';
import { NoticeService } from '../service/notice.service';
export declare class UserController {
    private readonly service;
    constructor(service: NoticeService);
    getList(auth: Auth): Promise<import("../entities/notice.entity").NoticeEntity[]>;
    setNoticeRead(auth: Auth, noticeId: number): Promise<{
        message: string;
        status: number;
    }>;
    setAllNoticeRead(auth: Auth): Promise<{
        message: string;
        status: number;
    }>;
}
