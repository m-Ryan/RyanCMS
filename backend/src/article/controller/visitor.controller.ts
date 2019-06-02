import { Controller, Get, Query, ParseIntPipe } from '@nestjs/common';
import { ArticleService } from '../service/article.service';
import { UN_SECRET_STATUS } from '../constance';
@Controller('article/visitor')
export class VisitorController {
  constructor(private readonly articleService: ArticleService) {}

  @Get('list')
  getList(
    @Query('page', new ParseIntPipe()) page: number,
    @Query('size', new ParseIntPipe()) size: number,
    @Query('user_id', new ParseIntPipe()) userId: number,
    @Query('category_id') categoryId?: number,
    @Query('tag_id') tagId?: number,
    @Query('order') order?: string,
  ) {
    const secret = UN_SECRET_STATUS; // 访客只能访问公开的
    return this.articleService.getList(
      page,
      size,
      userId,
      secret,
      categoryId,
      tagId,
      order,
    );
  }

  @Get('detail')
  getArticle(
    @Query('title') title: string,
    @Query('article_id') articleId: number,
    @Query('user_id', new ParseIntPipe()) userId: number,
  ) {
    const secret = UN_SECRET_STATUS; // 访客只能访问公开的
    return this.articleService.getArticle(userId, articleId, title, secret);
  }
}
