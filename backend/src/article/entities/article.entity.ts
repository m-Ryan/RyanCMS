import {
	Entity,
	Column,
	PrimaryGeneratedColumn,
	BaseEntity,
	getConnection,
	OneToOne,
	JoinColumn,
	ManyToMany,
	JoinTable,
	In,
	ManyToOne,
	Like
} from 'typeorm';

import dayjs from 'dayjs';
import { ArticleContentEntity } from './article_content.entity';
import { CreateArticleDto } from '../form/create_article.dto';
import { UserError } from '../../common/filters/userError';
import { TagEntity } from '../../tag/entities/tag.entity';
import { UpdateArticleDto } from '../form/update_article.dto';
import { CategoryEntity } from '../../category/entities/category.entity';
import { CommentEntity } from '../../comment/entities/comment.entity';
import { UserEntity } from '../../user/entities/user.entity';
import _ from 'lodash';
@Entity('article')
export class ArticleEntity extends BaseEntity {
	@PrimaryGeneratedColumn() article_id: number;

	@Column({
		type: 'varchar',
		length: 40,
		default: ''
	})
	title: string;

	@Column({
		type: 'varchar',
		length: 255,
		default: ''
	})
	summary: string;

	@Column({
		type: 'varchar',
		length: 255,
		default: ''
	})
	picture: string;

	// 文章类型 1=> 原创 2=> 转载 3=> 翻译
	@Column({
		type: 'smallint',
		default: 1
	})
	category_id: number;

	// 原文链接  转载、 翻译时用
	@Column({
		type: 'varchar',
		length: 255,
		default: ''
	})
	origin_source: string;

	@Column({
		type: 'int',
		default: 0
	})
	readcount: number;

	@Column({
		type: 'int',
		default: 0
	})
	user_id: number;

	// 私密
	@Column({
		type: 'tinyint',
		default: 0
	})
	secret: number;

	// 私密
	@Column({
		type: 'smallint',
		default: 10
	})
	level: number;

	@ManyToOne((type) => UserEntity, (UserEntity) => UserEntity.articles)
	@JoinColumn({ name: 'user_id' })
	user: UserEntity;

	@Column({
		type: 'int',
		default: 0
	})
	created_at: number;

	@Column({
		type: 'int',
		default: 0
	})
	updated_at: number;

	@Column({
		type: 'int',
		default: 0
	})
	deleted_at: number;

	@OneToOne((type) => ArticleContentEntity, (ArticleContentEntity) => ArticleContentEntity.article)
	content: ArticleContentEntity;

	@ManyToOne((type) => CategoryEntity, (CategoryEntity) => CategoryEntity.category_id)
	@JoinColumn({ name: 'category_id' })
	category: CategoryEntity;

	@ManyToMany((type) => TagEntity, (TagEntity) => TagEntity.articles)
	@JoinTable()
	tags: TagEntity[];

	public static async createArticle(createArticleDto: CreateArticleDto, userId: number) {
		const user = await UserEntity.findOne({
			user_id: userId
		});
		if (!user) {
			throw new UserError('用户不存在');
		}

		const tags = await TagEntity.find({
			where: {
				tag_id: In(createArticleDto.tags)
			}
		});
		if (tags.length !== createArticleDto.tags.length) {
			throw new UserError('所选标签中部分标签不存在');
		}

		return getConnection().transaction(async (transactionalEntityManager) => {
			createArticleDto.content = createArticleDto.content.trim();
			createArticleDto.title = createArticleDto.title.trim();
			if (!createArticleDto.title) {
				throw new UserError('标题不能为空');
			}

			if (!createArticleDto.content) {
				throw new UserError('内容不能为空');
			}

			if (!createArticleDto.summary) {
				throw new UserError('摘要不能为空');
			}

			const article = new ArticleEntity();
			article.title = createArticleDto.title.trim();
			article.summary = createArticleDto.summary;
			article.secret = createArticleDto.secret;
			article.picture = createArticleDto.picture;
			article.tags = tags;
			article.category_id = createArticleDto.category_id;
			article.user = user;
			article.created_at = dayjs().unix();
			article.updated_at = dayjs().unix();
			await transactionalEntityManager.save(article);

			// 关联文章内容
			const content = new ArticleContentEntity();
			content.article_id = article.article_id;
			content.content = createArticleDto.content;
			await transactionalEntityManager.save(content);
			article.content = content;

			// 关系留言区
			const comment = new CommentEntity();
			comment.article_id = article.article_id;
			await transactionalEntityManager.save(comment);

			return article;
		});
	}

	public static async updateArticle(updateArticleDto: UpdateArticleDto, userId: number) {
		const { article_id, title, content, summary, picture, tags, category_id, secret, level } = updateArticleDto;
		const condition: any = {
			article_id,
			user_id: userId
		};

		return getConnection().transaction(async (transactionalEntityManager) => {
			const article = await this.findOne({
				where: condition
			});
			if (!article) {
				throw new UserError('文章不存在');
			}

			if (title) {
				article.title = title;
			}

			if (summary) {
				article.summary = summary;
			}

			if (_.isInteger(secret)) {
				article.secret = secret;
			}

			if (picture) {
				article.picture = picture;
			}

			if (level) {
				article.level = level;
			}

			if (tags) {
				const tagEntitys = await TagEntity.find({
					where: {
						tag_id: In(updateArticleDto.tags),
						deleted_at: 0
					}
				});
				if (tagEntitys.length !== tags.length) {
					throw new UserError('所选标签中部分标签不存在');
				}
				article.tags = tagEntitys;
			}

			if (category_id) {
				const category = await CategoryEntity.findOne({
					where: {
						category_id,
						deleted_at: 0
					}
				});
				if (!category) {
					throw new UserError('所选的分类不存在');
				}
				article.category_id = category_id;
			}
			if (content) {
				await ArticleContentEntity.updateArticleContent(transactionalEntityManager, article_id, content);
			}
			article.updated_at = dayjs().unix();
			await this.save(article);
		});
	}

	public static async deleteArticle(articleId: number, userId: number) {
		const article = await this.findOne({
			where: {
				article_id: articleId,
				deleted_at: 0,
				user_id: userId
			}
		});
		if (!article) {
			throw new UserError('文章不存在');
		}
		article.deleted_at = dayjs().unix();
		return this.save(article);
	}

	public static async getArticle(articleId: number, userId: number, title: string, secret?: number) {
		const condition: any = {
			deleted_at: 0
		};
		if (_.isInteger(secret)) {
			condition.secret = secret;
		}
		if (!articleId && !title) {
			throw new UserError('文章不存在');
		}
		if (userId) {
			condition.user_id = userId;
		}
		if (articleId) {
			condition.article_id = articleId;
		}
		if (title) {
			condition.title = title;
		}
		const article = await this.findOne({
			where: condition,
			relations: [ 'content', 'tags' ]
		});
		if (!article) {
			throw new UserError('文章不存在');
		}
		article.readcount = article.readcount + 1;
		return this.save(article);
	}

	public static async getList(
		page: number,
		size: number,
		userId: number,
		secret?: number,
		categoryId?: number,
		tagId?: number,
		order?: string
	) {
		const condition: any = {
			deleted_at: 0
		};

		if (_.isInteger(secret)) {
			condition.secret = secret;
		}

		if (userId) {
			condition.user_id = userId;
		}
		if (categoryId) {
			condition.category_id = categoryId;
		}
		const orderColumn = order ? `article.${order}` : 'article.article_id';

		let result = null;
		if (tagId) {
			result = await this.createQueryBuilder('article')
				.leftJoinAndSelect('article.tags', 'tag')
				.leftJoinAndSelect('article.category', 'category')
				.where(condition)
				.andWhere('tag.tag_id = :tag_id', { tag_id: tagId })
				.orderBy({
					'article.level': 'DESC',
					[orderColumn]: 'DESC'
				})
				.take(size)
				.skip((page - 1) * size)
				.getManyAndCount();
		} else {
			result = await this.createQueryBuilder('article')
				.leftJoinAndSelect('article.tags', 'tag')
				.leftJoinAndSelect('article.category', 'category')
				.where(condition)
				.orderBy({
					'article.level': 'DESC',
					[orderColumn]: 'DESC'
				})
				.take(size)
				.skip((page - 1) * size)
				.getManyAndCount();
		}

		return {
			list: result[0],
			count: result[1]
		};
	}

	public static async search(title: string, page: number, size: number, userId: number, secret: number) {
		const condition: any = {
			title: Like(`%${title}%`),
			user_id: userId
		};
		if (_.isInteger(secret)) {
			condition.secret = secret;
		}
		const result = await this.findAndCount({
			where: condition,
			skip: (page - 1) * size,
			take: size,
			order: {
				article_id: 'DESC'
			},
			relations: [ 'tags', 'category' ]
		});
		return {
			list: result[0],
			count: result[1]
		};
	}
}
