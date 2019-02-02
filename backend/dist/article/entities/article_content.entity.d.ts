import { BaseEntity, EntityManager } from 'typeorm';
import { ArticleEntity } from './article.entity';
export declare class ArticleContentEntity extends BaseEntity {
    article_id: number;
    content: string;
    article: ArticleEntity;
    static updateArticleContent(transactionalEntityManager: EntityManager, articleId: number, content: string): Promise<ArticleContentEntity>;
}
