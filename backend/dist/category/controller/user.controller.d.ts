import { CategoryService } from '../service/category.service';
import { Auth } from '../../common/interface/Auth';
import { UpdateCategoryDto } from '../form/update_category.dto';
import { CreateCategoryDto } from '../form/create_category.dto';
export declare class UserController {
    private readonly categoryService;
    constructor(categoryService: CategoryService);
    createCategory(crateCategoryDto: CreateCategoryDto, auth: Auth): Promise<import("../entities/category.entity").CategoryEntity>;
    getList(auth: Auth, page: number, size: number): Promise<{
        list: import("../entities/category.entity").CategoryEntity[];
        count: number;
    }>;
    daleteTag(categoryId: number, auth: Auth): Promise<{
        message: string;
        status: number;
    }>;
    updateTag(updateCategoryDto: UpdateCategoryDto, auth: Auth): Promise<import("../entities/category.entity").CategoryEntity>;
}
