import { Injectable } from '@nestjs/common';
import { CreateArticleDto } from '../form/create_article.dto';
import { ArticleEntity } from '../entities/article.entity';
import { UpdateArticleDto } from '../form/update_article.dto';
@Injectable()
export class ArticleService {
	constructor() {}

	createArticle(createArticleDto: CreateArticleDto, userId: number) {
		return ArticleEntity.createArticle(createArticleDto, userId);
	}

	updateArticle(updateArticleDto: UpdateArticleDto, userId: number) {
		return ArticleEntity.updateArticle(updateArticleDto, userId);
	}

	deleteArticle(articleId: number, userId: number) {
		return ArticleEntity.deleteArticle(articleId, userId);
	}

	getArticle(userId: number, articleId: number, title: string, secret?: number) {
		return ArticleEntity.getArticle(articleId, userId, title, secret);
	}

	getList(
		page: number,
		size: number,
		userId: number,
		secret?: number,
		categoryId?: number,
		tagId?: number,
		order?: string
	) {
		return ArticleEntity.getList(page, size, userId, secret, categoryId, tagId, order);
	}

	search(title: string, page: number, size: number, userId: number, secret?: number) {
		return ArticleEntity.search(title, page, size, userId, secret);
	}
}
