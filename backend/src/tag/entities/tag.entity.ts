import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, ManyToMany } from 'typeorm';

import dayjs from 'dayjs';
import { CreateTagDto } from '../form/create_tag.dto';
import { UpdateTagDto } from '../form/update_tag.dto';
import { ArticleEntity } from '../../article/entities/article.entity';
import { UserError } from '../../common/filters/userError';
@Entity('tag')
export class TagEntity extends BaseEntity {
	@PrimaryGeneratedColumn() tag_id: number;

	@Column({
		type: 'varchar',
		length: 20,
		default: ''
	})
	name: string;

	@Column({
		type: 'varchar',
		length: 255,
		default: ''
	})
	picture: string;

	@Column({
		type: 'varchar',
		length: 255,
		default: ''
	})
	desc: string;

	@Column({
		type: 'int',
		default: 0
	})
	created_at: number;

	// 编辑这个标签的人
	@Column({
		type: 'int',
		default: 0
	})
	user_id: number;

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

	@ManyToMany((type) => ArticleEntity, (ArticleEntity) => ArticleEntity.tags)
	articles: ArticleEntity[];

	public static async checkExist(name: string, userId: number) {
		const existTag = await this.findOne({
			where: {
				name,
				user_id: userId,
				deleted_at: 0
			}
		});
		return existTag;
	}

	public static async createTag(createTagDto: CreateTagDto, userId: number) {
		const { name, picture, desc } = createTagDto;
		const existTag = await this.checkExist(name, userId);
		if (existTag) {
			throw new UserError('已有同名标签');
		}
		const tag = new TagEntity();
		tag.name = name;
		tag.picture = picture;
		tag.desc = desc;
		tag.user_id = userId;
		tag.created_at = dayjs().unix();
		return this.save(tag);
	}

	public static async updateTag(updateTagDto: UpdateTagDto, userId: number) {
		const { name, picture, desc, tag_id } = updateTagDto;
		const existTag = await this.checkExist(name, userId);
		if (existTag && existTag.tag_id !== tag_id) {
			throw new UserError('已有同名标签');
		}
		const tag = await this.findOne({
			where: {
				tag_id,
				deleted_at: 0,
				user_id: userId
			}
		});

		if (!tag) {
			throw new UserError('分类不存在');
		}
		if (name) {
			tag.name = name;
		}
		if (picture) {
			tag.picture = picture;
		}
		if (desc) {
			tag.desc = desc;
		}
		tag.updated_at = dayjs().unix();
		return this.save(tag);
	}

	public static async deleteTag(tagId: number, userId: number) {
		const tag = await this.findOne({
			where: {
				tag_id: tagId,
				deleted_at: 0,
				user_id: userId
			},
			relations: [ 'articles' ]
		});

		if (!tag) {
			throw new UserError('标签不存在');
		}

		if (tag.articles.length > 0) {
			throw new UserError('该标签下文章不为空，不能删除');
		}
		return this.delete(tag);
	}

	public static async getTag(userId: number, name: string) {
		const tag = await this.findOne({
			where: {
				user_id: userId,
				name
			}
		});
		if (!tag) {
			throw new UserError('标签不存在');
		}
		return tag;
	}

	public static async getList(page: number, size: number, userId: number) {
		const result = await this.findAndCount({
			where: {
				deleted_at: 0,
				user_id: userId
			},
			relations: [ 'articles' ],
			skip: (page - 1) * size,
			take: size,
			order: {
				name: 'ASC'
			}
		});
		const formatData: any = result;
		formatData.articlesCount = formatData[0].forEach((item: any) => {
			item.articlesCount = item.articles.length;
			delete item.articles;
		});

		return {
			list: formatData[0],
			count: formatData[1]
		};
	}
}
