import { CreateArticleDto } from '../form/create_article.dto';
import { ArticleEntity } from '../entities/article.entity';
import { UpdateArticleDto } from '../form/update_article.dto';
export declare class ArticleService {
    constructor();
    createArticle(createArticleDto: CreateArticleDto, userId: number): Promise<ArticleEntity>;
    updateArticle(updateArticleDto: UpdateArticleDto, userId: number): Promise<void>;
    deleteArticle(articleId: number, userId: number): Promise<ArticleEntity>;
    getArticle(userId: number, articleId: number, title: string, secret?: number): Promise<ArticleEntity>;
    getList(page: number, size: number, userId: number, secret?: number, categoryId?: number, tagId?: number, order?: string): Promise<{
        list: any;
        count: any;
    }>;
    search(title: string, page: number, size: number, userId: number, secret?: number): Promise<{
        list: ArticleEntity[];
        count: number;
    }>;
}
