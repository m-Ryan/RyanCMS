import { Module } from '@nestjs/common';
import { UserController } from './controller/user.controller';
import { AdminController } from './controller/admin.controller';
import { VisitorController } from './controller/visitor.controller';
import { PhotoService } from './service/photo.service';

@Module({
	imports: [],
	controllers: [ UserController, AdminController, VisitorController ],
	providers: [ PhotoService ]
})
export class PhotoModule {}
