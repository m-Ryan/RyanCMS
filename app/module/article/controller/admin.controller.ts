import { Controller, Get, Query, Headers, UseGuards, ParseIntPipe } from '@nestjs/common';
import { ArticleService } from '../service/article.service';
import { Auth } from '../../../common/interface/Auth';
import { AdminGuard } from '../../../common/guards/admin.guard';
@Controller('article/admin')
@UseGuards(AdminGuard)
export class AdminController {
	constructor(private readonly articleService: ArticleService) { }

	@Get('detail')
	getArticle(@Query('title') title: string, @Query('article_id') articleId: number, @Headers('auth') auth: Auth) {
		const userId = 0;
		return this.articleService.getArticle(userId, articleId, title);
	}

	@Get('list')
	getList(
		@Query('page', new ParseIntPipe())
		page: number,
		@Query('size', new ParseIntPipe())
		size: number,
		@Headers('auth') auth: Auth,
		@Query('category_id') categoryId?: number,
		@Query('secret') secret?: number,
		@Query('tag_id') tagId?: number,
		@Headers('order') order?: string
	) {
		const userId = 0;
		return this.articleService.getList(page, size, userId, secret, categoryId, tagId, order);
	}
}
