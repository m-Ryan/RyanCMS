import { BaseEntity } from 'typeorm';
export declare class NoticeReadEntity extends BaseEntity {
    read_id: number;
    user_id: number;
    notice_id: number;
    updated_at: number;
    created_at: number;
    deleted_at: number;
}
