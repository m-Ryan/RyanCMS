import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { UserService } from '../service/user.service';
import { RegisterDto } from '../form/register.dto';
import { LoginDto } from '../form/login.dto';
import { USER_RANK } from '../../common/constant/User';
@Controller('user/visitor')
export class VisitorController {
  constructor(private readonly userService: UserService) {}

  @Post('/register')
  async register(@Body() registerDto: RegisterDto) {
    const data = new RegisterDto(registerDto);
    await data.validate();
    return this.userService.register(data, USER_RANK);
  }

  @Post('/login')
  async login(@Body() loginDto: LoginDto) {
    const data = new LoginDto(loginDto);
    await data.validate();
    return this.userService.login(loginDto);
  }

  @Get('/base_info')
  async getBaseInfo(@Query('nickname') nickname: string) {
    return this.userService.getBaseInfo(nickname);
  }

  @Get('/resume')
  async getResume(@Query('user_id', new ParseIntPipe()) userId: number) {
    return this.userService.getResume(userId);
  }
}
