import { Module } from '@nestjs/common';
import { UserController } from './controller/user.controller';
import { AdminController } from './controller/admin.controller';
import { VisitorController } from './controller/visitor.controller';
import { Service } from './service/index.service';

@Module({
  imports: [],
  controllers: [UserController, AdminController, VisitorController],
  providers: [Service],
})
export class FunnyPictureModule {}
