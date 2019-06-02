import { BaseEntity } from 'typeorm';
import { CreateNoticeDto } from '../form/create_notice.dto';
export declare class NoticeEntity extends BaseEntity {
    notice_id: number;
    user_id: number;
    title: string;
    content: string;
    updated_at: number;
    rank: number;
    type: NoticeType;
    link: string;
    created_at: number;
    deleted_at: number;
    static createNotice(createNoticeDto: CreateNoticeDto, rank: number, userId: number): Promise<NoticeEntity>;
    static setNoticeRead(noticeId: number, userId: number): Promise<void>;
    static setAllNoticeRead(userId: number): Promise<import("typeorm").InsertResult>;
    static getNewNoticeList(userId: number, rank: number): Promise<NoticeEntity[]>;
    static deleteNotice(noticeId: number, userId: number): Promise<NoticeEntity>;
}
export declare enum NoticeType {
    article = "ARTICLE"
}
