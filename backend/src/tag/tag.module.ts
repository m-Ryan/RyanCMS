import { Module } from '@nestjs/common';
import { TagService } from './service/tag.service';
import { UserController } from './controller/user.controller';
import { AdminController } from './controller/admin.controller';
import { VisitorController } from './controller/visitor.controller';

@Module({
  imports: [],
  controllers: [UserController, AdminController, VisitorController],
  providers: [TagService],
})
export class TagModule {}
