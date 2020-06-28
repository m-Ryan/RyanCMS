import { Injectable, BadRequestException, HttpService } from '@nestjs/common';
import { RegisterDto } from '../form/register.dto';
import { UserEntity } from '../entities/user.entity';
import { LoginDto } from '../form/login.dto';
import { UpdateUserDto } from '../form/updateUser.dto';
import { UserResumeEntity } from '../entities/user_resume.entity';
import { UserThemeEntity } from '../entities/user_theme.entity';
import { UpdateThemeDto } from '../form/updateTheme.dto';
@Injectable()
export class UserService {
	constructor() {}

	register(registerDto: RegisterDto, userRank: number) {
		return UserEntity.register(registerDto, userRank);
	}

	getUser(userId: number) {
		return UserEntity.getUser(userId);
	}

	getBaseInfo(nickname?: string, userId?: number, domain?: string) {
		return UserEntity.getBaseInfo(nickname, userId, domain);
	}
	getDomainList() {
		return UserEntity.getDomainList();
	}

	login(loginDto: LoginDto) {
		return UserEntity.login(loginDto);
	}

	updateUser(updateUserDto: UpdateUserDto, userId: number) {
		return UserEntity.updateUser(updateUserDto, userId);
	}
	getResume(userId: number) {
		return UserResumeEntity.getResume(userId);
	}

	updateResume(userId: number, content: string) {
		return UserResumeEntity.updateResume(userId, content);
	}

	updateTheme(userId: number, theme: UpdateThemeDto) {
		return UserThemeEntity.updateTheme(userId, theme);
	}
}
