import { CategoryService } from '../service/category.service';
export declare class UserController {
    private readonly categoryService;
    constructor(categoryService: CategoryService);
    getList(page: number, size: number, userId: number): Promise<{
        list: import("../entities/category.entity").CategoryEntity[];
        count: number;
    }>;
}
