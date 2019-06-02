import { BaseEntity } from 'typeorm';
import { UserEntity } from './user.entity';
export declare class UserConcatEntity extends BaseEntity {
    user_id: number;
    user: UserEntity;
    email: string;
    github: string;
    zhihu: string;
    weibo: string;
}
