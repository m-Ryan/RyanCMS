import { UserService } from '../service/user.service';
import { RegisterDto } from '../form/register.dto';
import { LoginDto } from '../form/login.dto';
export declare class VisitorController {
    private readonly userService;
    constructor(userService: UserService);
    register(registerDto: RegisterDto): Promise<import("../entities/user.entity").UserEntity>;
    login(loginDto: LoginDto): Promise<import("../entities/user.entity").UserEntity>;
    getBaseInfo(nickname: string, userId: number): Promise<import("../entities/user.entity").UserEntity>;
    getResume(userId: number): Promise<import("../entities/user_resume.entity").UserResumeEntity>;
}
