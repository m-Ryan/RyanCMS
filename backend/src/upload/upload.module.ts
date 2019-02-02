import { Module } from '@nestjs/common';
import { UploadService } from './service/upload.service';
import { UserController } from './controller/user.controller';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [UploadService],
})
export class UploadModule {}
