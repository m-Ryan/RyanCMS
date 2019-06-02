import { ArticleService } from '../service/article.service';
import { CreateArticleDto } from '../form/create_article.dto';
import { Auth } from '../../common/interface/Auth';
import { UpdateArticleDto } from '../form/update_article.dto';
export declare class UserController {
    private readonly articleService;
    constructor(articleService: ArticleService);
    createTag(crateTagDto: CreateArticleDto, auth: Auth): Promise<import("../entities/article.entity").ArticleEntity>;
    updateTag(updateTagDto: UpdateArticleDto, auth: Auth): Promise<{
        message: string;
        status: number;
    }>;
    getArticle(title: string, articleId: number, auth: Auth): Promise<import("../entities/article.entity").ArticleEntity>;
    getList(page: number, size: number, auth: Auth, categoryId?: number, secret?: number, tagId?: number, order?: string): Promise<{
        list: any;
        count: any;
    }>;
    search(title: string, page: number, size: number, auth: Auth): Promise<{
        list: import("../entities/article.entity").ArticleEntity[];
        count: number;
    }>;
    deleteArticle(articleId: number, auth: Auth): Promise<{
        message: string;
        status: number;
    }>;
}
