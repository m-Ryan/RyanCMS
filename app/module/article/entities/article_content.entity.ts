import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  EntityManager,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { UserError } from '../../../common/filters/userError';
import { ArticleEntity } from './article.entity';
@Entity('article_content')
export class ArticleContentEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  article_id: number;
  @Column({
    type: 'longtext'
  })
  content: string;

  @OneToOne(type => ArticleEntity, ArticleEntity => ArticleEntity.content)
  @JoinColumn({ name: 'article_id' })
  article: ArticleEntity;

  public static async updateArticleContent(
    transactionalEntityManager: EntityManager,
    articleId: number,
    content: string,
  ) {
    const articleContent = await ArticleContentEntity.findOne({
      where: {
        article_id: articleId,
      },
    });
    if (!articleContent) {
      throw new UserError('文章不存在');
    }
    articleContent.content = content;
    return transactionalEntityManager.save(articleContent);
  }
}
