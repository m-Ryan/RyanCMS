import { Module, MiddlewareConsumer } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './module/user/user.module';
import { TagModule } from './module/tag/tag.module';
import { ArticleModule } from './module/article/article.module';
import { CategoryModule } from './module/category/category.module';
import { UploadModule } from './module/upload/upload.module';
import { CommentModule } from './module/comment/comment.module';
import { CommonModule } from './common/common.module';
import { UserAuthorizeMiddleware } from './common/middlewares/user.authorize.middleware';
import { RenderMiddleware } from './common/middlewares/render.middleware';
import { AlbumModule } from './module/album/album.module';
import { NoticeModule } from './module/notice/notice.module';
import { MapModule } from './module/map/map.module';
import { ToolsModule } from './module/tools/index.module';
import { AppController } from './app.controller';
import { isDevelopment } from './util/util';
import { StaticProxyMiddleware } from './common/middlewares/static-proxy.middleware';

const ormConfig = {
  type: 'mysql',
  host: process.env.MAIN_SERVER,
  port: 3306,
  username: process.env.MYSQL_USER_NAME,
  password: process.env.MYSQL_PASSWORD,
  database: 'cms',
  entities: ['**/**.entity{.ts,}'],
  synchronize: false,
  cache: true,
  logging: false,
};

@Module({
  imports: [
    TypeOrmModule.forRoot(ormConfig as any),
    CommonModule,
    UserModule,
    TagModule,
    ArticleModule,
    CategoryModule,
    UploadModule,
    AlbumModule,
    NoticeModule,
    MapModule,
    CommentModule,
    ToolsModule,
  ],
  controllers: [AppController],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    if (isDevelopment()) {
      consumer.apply(StaticProxyMiddleware).forRoutes('');
    }
    consumer.apply(RenderMiddleware).forRoutes('');
    consumer.apply(UserAuthorizeMiddleware).forRoutes('');
  }
}
