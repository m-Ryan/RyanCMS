import { Module } from '@nestjs/common';
import { CategoryService } from './service/category.service';
import { UserController } from './controller/user.controller';
import { AdminController } from './controller/admin.controller';

@Module({
  imports: [],
  controllers: [UserController, AdminController],
  providers: [CategoryService],
})
export class CategoryModule {}
