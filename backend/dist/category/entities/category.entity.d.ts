import { BaseEntity } from 'typeorm';
import { CreateCategoryDto } from '../form/create_category.dto';
import { UpdateCategoryDto } from '../form/update_category.dto';
import { ArticleEntity } from '../../article/entities/article.entity';
export declare class CategoryEntity extends BaseEntity {
    category_id: number;
    name: string;
    picture: string;
    desc: string;
    created_at: number;
    user_id: number;
    updated_at: number;
    deleted_at: number;
    articles: ArticleEntity[];
    static checkExist(name: string, userId: number): Promise<CategoryEntity>;
    static createCategory(createCategoryDto: CreateCategoryDto, userId: number): Promise<CategoryEntity>;
    static updateCategory(updateCategoryDto: UpdateCategoryDto, userId: number): Promise<CategoryEntity>;
    static deleteCategory(categoryId: number, userId: number): Promise<import("typeorm").DeleteResult>;
    static getList(page: number, size: number, userId?: number): Promise<{
        list: CategoryEntity[];
        count: number;
    }>;
}
