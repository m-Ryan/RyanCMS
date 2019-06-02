import { BaseEntity } from 'typeorm';
import { UserEntity } from './user.entity';
import { UpdateThemeDto } from '../form/updateTheme.dto';
export declare class UserThemeEntity extends BaseEntity {
    user_id: number;
    music: string;
    color: string;
    user: UserEntity;
    static updateTheme(userId: number, updateThemeDto: UpdateThemeDto): Promise<UserThemeEntity>;
    static getTheme(userId: number): Promise<UserThemeEntity>;
}
