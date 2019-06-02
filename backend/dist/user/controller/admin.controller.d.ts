import { UserService } from '../service/user.service';
import { RegisterDto } from '../form/register.dto';
export declare class AdminController {
    private readonly userService;
    constructor(userService: UserService);
    register(registerDto: RegisterDto): Promise<import("../entities/user.entity").UserEntity>;
}
