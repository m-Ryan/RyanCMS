import { Module } from '@nestjs/common';
import { UserController } from './controller/user.controller';
import { AdminController } from './controller/admin.controller';
import { NoticeService } from './service/notice.service';
import { VisitorController } from './controller/visitor.controller';

@Module({
	imports: [],
	controllers: [ UserController, AdminController, VisitorController ],
	providers: [ NoticeService ]
})
export class NoticeModule {}
