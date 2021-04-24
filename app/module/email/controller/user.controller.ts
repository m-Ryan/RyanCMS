import { Controller, Get, Query, UseGuards, Post, Body } from '@nestjs/common';
import { UserGuard } from '../../../common/guards/user.guard';
import { SendEmailJsonDto } from '../form/send_email.dto';
import { EmailService } from '../service/index.service';


@UseGuards(UserGuard)
@Controller('email/user')
export class UserController {
	constructor(private readonly service: EmailService) { }

	@Post('/send')
	async getTyping(@Body() postDto: SendEmailJsonDto) {
		const data = new SendEmailJsonDto(postDto);
		await data.validate();
		return this.service.senEmail(postDto);
	}
}
