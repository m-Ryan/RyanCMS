import { RegisterDto } from '../form/register.dto';
import { UserEntity } from '../entities/user.entity';
import { LoginDto } from '../form/login.dto';
import { UpdateUserDto } from '../form/updateUser.dto';
import { UserResumeEntity } from '../entities/user_resume.entity';
import { UserThemeEntity } from '../entities/user_theme.entity';
import { UpdateThemeDto } from '../form/updateTheme.dto';
export declare class UserService {
    constructor();
    register(registerDto: RegisterDto, userRank: number): Promise<UserEntity>;
    getUser(userId: number): Promise<UserEntity>;
    getBaseInfo(nickname?: string, userId?: number): Promise<UserEntity>;
    login(loginDto: LoginDto): Promise<UserEntity>;
    updateUser(updateUserDto: UpdateUserDto, userId: number): Promise<void>;
    getResume(userId: number): Promise<UserResumeEntity>;
    updateResume(userId: number, content: string): Promise<UserResumeEntity>;
    updateTheme(userId: number, theme: UpdateThemeDto): Promise<UserThemeEntity>;
}
