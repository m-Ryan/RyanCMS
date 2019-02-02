import { RegisterDto } from '../form/register.dto';
import { UserEntity } from '../entities/user.entity';
import { LoginDto } from '../form/login.dto';
import { UpdateUserDto } from '../form/updateUser.dto';
import { UserResumeEntity } from '../entities/user_resume.entity';
export declare class UserService {
    constructor();
    register(registerDto: RegisterDto, userRank: number): Promise<UserEntity>;
    getUser(userId: number): Promise<UserEntity>;
    getBaseInfo(nickname: string): Promise<UserEntity>;
    login(loginDto: LoginDto): Promise<UserEntity>;
    updateUser(updateUserDto: UpdateUserDto, userId: number): Promise<void>;
    getResume(userId: number): Promise<UserResumeEntity>;
    updateResume(userId: number, content: string): Promise<UserResumeEntity>;
}
