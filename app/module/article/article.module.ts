import { Module } from '@nestjs/common';
import { UserController } from './controller/user.controller';
import { AdminController } from './controller/admin.controller';
import { VisitorController } from './controller/visitor.controller';
import { ArticleService } from './service/article.service';

@Module({
  imports: [],
  controllers: [UserController, AdminController, VisitorController],
  providers: [ArticleService],
})
export class ArticleModule {}
