import { Module, HttpModule } from '@nestjs/common';
import { UserController } from './controller/user.controller';
import { EmailService } from './service/index.service';

@Module({
	imports: [HttpModule],
	controllers: [UserController],
	providers: [EmailService]
})
export class EmailModule { }
