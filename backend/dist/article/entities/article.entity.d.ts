import { BaseEntity } from 'typeorm';
import { ArticleContentEntity } from './article_content.entity';
import { CreateArticleDto } from '../form/create_article.dto';
import { TagEntity } from '../../tag/entities/tag.entity';
import { UpdateArticleDto } from '../form/update_article.dto';
import { CategoryEntity } from '../../category/entities/category.entity';
import { UserEntity } from '../../user/entities/user.entity';
export declare class ArticleEntity extends BaseEntity {
    article_id: number;
    title: string;
    summary: string;
    picture: string;
    category_id: number;
    origin_source: string;
    readcount: number;
    user_id: number;
    secret: number;
    user: UserEntity;
    created_at: number;
    updated_at: number;
    deleted_at: number;
    content: ArticleContentEntity;
    category: CategoryEntity;
    tags: TagEntity[];
    static createArticle(createArticleDto: CreateArticleDto, userId: number): Promise<ArticleEntity>;
    static updateArticle(updateArticleDto: UpdateArticleDto, userId: number): Promise<void>;
    static deleteArticle(articleId: number, userId: number): Promise<ArticleEntity>;
    static getArticle(articleId: number, userId: number, title: string, secret?: number): Promise<ArticleEntity>;
    static getList(page: number, size: number, userId: number, secret?: number, categoryId?: number, tagId?: number, order?: string): Promise<{
        list: any;
        count: any;
    }>;
    static search(title: string, page: number, size: number, userId: number, secret: number): Promise<{
        list: ArticleEntity[];
        count: number;
    }>;
}
