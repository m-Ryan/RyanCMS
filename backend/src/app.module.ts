import { Module, MiddlewareConsumer } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { TagModule } from './tag/tag.module';
import { ArticleModule } from './article/article.module';
import { CategoryModule } from './category/category.module';
import { UploadModule } from './upload/upload.module';
import { CommentModule } from './comment/comment.module';
import { CommonModule } from './common/common.module';
import { UserAuthorizeMiddleware } from './common/middlewares/user.authorize.middleware';

const file = process.cwd() + '/config/ormconfig.json';
const ormConfig = require(file);

@Module({
  imports: [
    TypeOrmModule.forRoot(ormConfig as any),
    CommonModule,
    UserModule,
    TagModule,
    ArticleModule,
    CategoryModule,
    UploadModule,
    CommentModule,
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(UserAuthorizeMiddleware).forRoutes('');
  }
}
