import { Controller, Get, Post, Body, Query, Next, Headers, UseGuards } from '@nestjs/common';
import { UserService } from '../service/user.service';
import { RegisterDto } from '../form/register.dto';
import { LoginDto } from '../form/login.dto';
import { USER_RANK } from '../../common/constant/User';
import { UserGuard } from '../../common/guards/user.guard';
import { Auth } from '../../common/interface/Auth';
import { UpdateUserDto } from '../form/updateUser.dto';
import { SuccessResponse } from '../../common/filters/successResponse';
import { UpdateThemeDto } from '../form/updateTheme.dto';
@Controller('user/user')
@UseGuards(UserGuard)
export class UserController {
	constructor(private readonly userService: UserService) {}

	@UseGuards(UserGuard)
	@Post('/update')
	async update(@Body() updateUserDto: UpdateUserDto, @Headers('auth') auth: Auth) {
		const data = new UpdateUserDto(updateUserDto);
		await data.validate();
		await this.userService.updateUser(updateUserDto, auth.user_id);
		return SuccessResponse;
	}

	@UseGuards(UserGuard)
	@Get('/info')
	async getUser(@Headers('auth') auth: Auth) {
		return this.userService.getUser(auth.user_id);
	}

	@UseGuards(UserGuard)
	@Get('/resume')
	async getResume(@Headers('auth') auth: Auth) {
		return this.userService.getResume(auth.user_id);
	}

	@UseGuards(UserGuard)
	@Post('/update-resume')
	async updateResume(@Headers('auth') auth: Auth, @Body('content') content: string) {
		await this.userService.updateResume(auth.user_id, content);
		return SuccessResponse;
	}

	@UseGuards(UserGuard)
	@Post('/update-theme')
	async updateTheme(@Headers('auth') auth: Auth, @Body() updateThemeDto: UpdateThemeDto) {
		const data = new UpdateThemeDto(updateThemeDto);
		await data.validate();
		await this.userService.updateTheme(auth.user_id, data);
		return SuccessResponse;
	}
}
