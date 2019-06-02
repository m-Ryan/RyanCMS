import { ArticleService } from '../service/article.service';
export declare class VisitorController {
    private readonly articleService;
    constructor(articleService: ArticleService);
    getList(page: number, size: number, userId: number, categoryId?: number, tagId?: number, order?: string): Promise<{
        list: any;
        count: any;
    }>;
    getArticle(title: string, articleId: number, userId: number): Promise<import("../entities/article.entity").ArticleEntity>;
}
