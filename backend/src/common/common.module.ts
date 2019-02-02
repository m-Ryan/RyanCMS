import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserAuthorizeMiddleware } from './middlewares/user.authorize.middleware';

@Module({
  providers: [UserAuthorizeMiddleware],
  imports: [TypeOrmModule.forFeature([])],
})
export class CommonModule {}
