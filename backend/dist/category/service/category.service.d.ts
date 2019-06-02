import { CategoryEntity } from '../entities/category.entity';
import { CreateCategoryDto } from '../form/create_category.dto';
import { UpdateCategoryDto } from '../form/update_category.dto';
export declare class CategoryService {
    constructor();
    createCategory(createCategoryDto: CreateCategoryDto, userId: number): Promise<CategoryEntity>;
    updateCategory(updateCategoryDto: UpdateCategoryDto, userId: number): Promise<CategoryEntity>;
    daleteCategory(tagId: number, userId: number): Promise<import("typeorm").DeleteResult>;
    getList(page: number, size: number, userId: number): Promise<{
        list: CategoryEntity[];
        count: number;
    }>;
}
