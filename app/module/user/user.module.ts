import { Module, HttpModule } from '@nestjs/common';
import { UserService } from './service/user.service';
import { UserController } from './controller/user.controller';
import { AdminController } from './controller/admin.controller';
import { VisitorController } from './controller/visitor.controller';

@Module({
  imports: [],
  controllers: [UserController, AdminController, VisitorController],
  providers: [UserService],
})
export class UserModule {}
