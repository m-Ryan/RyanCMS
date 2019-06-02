import { ArticleService } from '../service/article.service';
import { Auth } from '../../common/interface/Auth';
export declare class AdminController {
    private readonly articleService;
    constructor(articleService: ArticleService);
    getArticle(title: string, articleId: number, auth: Auth): Promise<import("../entities/article.entity").ArticleEntity>;
    getList(page: number, size: number, auth: Auth, categoryId?: number, secret?: number, tagId?: number, order?: string): Promise<{
        list: any;
        count: any;
    }>;
}
