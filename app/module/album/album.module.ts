import { Module } from '@nestjs/common';
import { UserController } from './controller/user.controller';
import { AdminController } from './controller/admin.controller';
import { VisitorController } from './controller/visitor.controller';
import { AlbumService } from './service/album.service';

@Module({
	imports: [],
	controllers: [ UserController, AdminController, VisitorController ],
	providers: [ AlbumService ]
})
export class AlbumModule {}
