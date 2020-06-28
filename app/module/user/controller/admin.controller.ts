import { Controller, Get, Post, Body, Query, Next, Headers, UseGuards } from '@nestjs/common';
import { UserService } from '../service/user.service';
import { RegisterDto } from '../form/register.dto';
import { AdminGuard } from '../../../common/guards/admin.guard';
import { ADMIN_RANK } from '../../../common/constant/User';
@Controller('admin')
@UseGuards(AdminGuard)
export class AdminController {
	constructor(private readonly userService: UserService) { }

	@Post('/register')
	async register(@Body() registerDto: RegisterDto) {
		const data = new RegisterDto(registerDto);
		await data.validate();
		return this.userService.register(data, ADMIN_RANK);
	}
}
