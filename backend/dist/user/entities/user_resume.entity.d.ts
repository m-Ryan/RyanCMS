import { BaseEntity } from 'typeorm';
import { UserEntity } from './user.entity';
export declare class UserResumeEntity extends BaseEntity {
    user_id: number;
    content: string;
    user: UserEntity;
    static updateResume(userId: number, content: string): Promise<UserResumeEntity>;
    static getResume(userId: number): Promise<UserResumeEntity>;
}
