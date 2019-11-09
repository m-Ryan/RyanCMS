import { Module } from '@nestjs/common';
import { UploadService } from './service/upload.service';
import { UserController } from './controller/user.controller';
import { VisitorController } from './controller/visitor.controller';

@Module({
  imports: [],
  controllers: [UserController, VisitorController],
  providers: [UploadService],
})
export class UploadModule {}
