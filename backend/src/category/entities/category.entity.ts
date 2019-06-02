import {
	Entity,
	Column,
	PrimaryGeneratedColumn,
	BaseEntity,
	getConnection,
	OneToOne,
	JoinColumn,
	OneToMany
} from 'typeorm';

import dayjs from 'dayjs';
import { CreateCategoryDto } from '../form/create_category.dto';
import { UpdateCategoryDto } from '../form/update_category.dto';
import { UserError } from '../../common/filters/userError';
import { ArticleEntity } from '../../article/entities/article.entity';
@Entity('category')
export class CategoryEntity extends BaseEntity {
	@PrimaryGeneratedColumn() category_id: number;

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

	@OneToMany((type) => ArticleEntity, (ArticleEntity) => ArticleEntity.category)
	articles: ArticleEntity[];

	public static async checkExist(name: string, userId: number) {
		const existCategory = await this.findOne({
			where: {
				name,
				user_id: userId,
				deleted_at: 0
			}
		});
		return existCategory;
	}

	public static async createCategory(createCategoryDto: CreateCategoryDto, userId: number) {
		const { name, picture, desc } = createCategoryDto;
		const existCategory = await this.checkExist(name, userId);
		if (existCategory) {
			throw new UserError('已有同名分类');
		}
		const category = new CategoryEntity();
		category.name = name;
		category.picture = picture;
		category.desc = desc;
		category.user_id = userId;
		category.created_at = dayjs().unix();
		return this.save(category);
	}

	public static async updateCategory(updateCategoryDto: UpdateCategoryDto, userId: number) {
		const { name, picture, desc, category_id } = updateCategoryDto;
		const existCategory = await this.checkExist(name, userId);
		if (existCategory && existCategory.category_id !== category_id) {
			throw new UserError('已有同名分类');
		}
		const category = await this.findOne({
			where: {
				category_id,
				deleted_at: 0,
				user_id: userId
			},
			relations: [ 'articles' ]
		});

		if (!category) {
			throw new UserError('分类不存在');
		}
		if (category.articles.length > 0) {
			throw new UserError('该标签下文章不为空，不能删除');
		}
		if (name) {
			category.name = name;
		}
		if (picture) {
			category.picture = picture;
		}
		if (desc) {
			category.desc = desc;
		}
		category.updated_at = dayjs().unix();
		return this.save(category);
	}

	public static async deleteCategory(categoryId: number, userId: number) {
		const category = await this.findOne({
			where: {
				category_id: categoryId,
				deleted_at: 0,
				user_id: userId
			}
		});

		if (!category) {
			throw new UserError('分类不存在');
		}
		return this.delete(category);
	}

	public static async getList(page: number, size: number, userId?: number) {
		const condition: any = {
			deleted_at: 0
		};
		if (userId) {
			condition.user_id = userId;
		}
		const result = await this.findAndCount({
			where: condition,
			skip: (page - 1) * size,
			take: size,
			order: {
				name: 'ASC'
			}
		});

		return {
			list: result[0],
			count: result[1]
		};
	}
}
