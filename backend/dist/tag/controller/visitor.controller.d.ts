import { TagService } from '../service/tag.service';
export declare class VisitorController {
    private readonly tagService;
    constructor(tagService: TagService);
    getList(page: number, size: number, uerId: number): Promise<{
        list: import("../entities/tag.entity").TagEntity[];
        count: number;
    }>;
    getTag(userId: number, name: string): Promise<import("../entities/tag.entity").TagEntity>;
}
