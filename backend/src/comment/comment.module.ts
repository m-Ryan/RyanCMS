import { Module } from '@nestjs/common';
import { CommentService } from './service/comment.service';
import { UserController } from './controller/user.controller';
import { AdminController } from './controller/admin.controller';
import { VisitorController } from './controller/visitor.controller';

@Module({
  imports: [],
  controllers: [UserController, AdminController, VisitorController],
  providers: [CommentService],
})
export class CommentModule {}
