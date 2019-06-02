import { UserService } from '../service/user.service';
import { Auth } from '../../common/interface/Auth';
import { UpdateUserDto } from '../form/updateUser.dto';
import { UpdateThemeDto } from '../form/updateTheme.dto';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    update(updateUserDto: UpdateUserDto, auth: Auth): Promise<{
        message: string;
        status: number;
    }>;
    getUser(auth: Auth): Promise<import("../entities/user.entity").UserEntity>;
    getResume(auth: Auth): Promise<import("../entities/user_resume.entity").UserResumeEntity>;
    updateResume(auth: Auth, content: string): Promise<{
        message: string;
        status: number;
    }>;
    updateTheme(auth: Auth, updateThemeDto: UpdateThemeDto): Promise<{
        message: string;
        status: number;
    }>;
}
