import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  Next,
  Headers,
  UseGuards,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { ArticleService } from '../service/article.service';
import { CreateArticleDto } from '../form/create_article.dto';
import { UserGuard } from '../../common/guards/user.guard';
import { Auth } from '../../common/interface/Auth';
import { UpdateArticleDto } from '../form/update_article.dto';
import { SuccessResponse } from '../../common/filters/successResponse';
import { UserError } from '../../common/filters/userError';
@Controller('article/user')
@UseGuards(UserGuard)
export class UserController {
  constructor(private readonly articleService: ArticleService) {}
  @Post('/create-article')
  async createTag(
    @Body() crateTagDto: CreateArticleDto,
    @Headers('auth') auth: Auth,
  ) {
    const data = new CreateArticleDto(crateTagDto);
    await data.validate();
    return this.articleService.createArticle(data, auth.user_id);
  }

  @Post('/update-article')
  async updateTag(
    @Body() updateTagDto: UpdateArticleDto,
    @Headers('auth') auth: Auth,
  ) {
    const data = new UpdateArticleDto(updateTagDto);
    await data.validate();
    await this.articleService.updateArticle(data, auth.user_id);
    return SuccessResponse;
  }

  @Get('detail')
  getArticle(
    @Query('title') title: string,
    @Query('article_id') articleId: number,
    @Headers('auth') auth: Auth,
  ) {
    if (!articleId && !title) {
			throw new UserError('文章不存在');
		}
    return this.articleService.getArticle(auth.user_id, articleId, title);
  }

  @Get('list')
  getList(
    @Query('page', new ParseIntPipe()) page: number,
    @Query('size', new ParseIntPipe()) size: number,
    @Headers('auth') auth: Auth,
    @Query('category_id') categoryId?: number,
    @Query('secret') secret?: number,
    @Query('tag_id') tagId?: number,
    @Headers('order') order?: string,
  ) {
    return this.articleService.getList(
      page,
      size,
      auth.user_id,
      secret,
      categoryId,
      tagId,
      order,
    );
  }

  @Get('search')
  search(
    @Query('title') title: string,
    @Query('page', new ParseIntPipe()) page: number,
    @Query('size', new ParseIntPipe()) size: number,
    @Headers('auth') auth: Auth,
  ) {
    return this.articleService.search(title, page, size, auth.user_id);
  }

  @Get('delete')
  async deleteArticle(
    @Query('article_id', new ParseIntPipe()) articleId: number,
    @Headers('auth') auth: Auth,
  ) {
    await this.articleService.deleteArticle(articleId, auth.user_id);
    return SuccessResponse;
  }
}
