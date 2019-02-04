import { TagService } from '../service/tag.service';
import { CreateTagDto } from '../form/create_tag.dto';
import { Auth } from '../../common/interface/Auth';
import { UpdateTagDto } from '../form/update_tag.dto';
export declare class UserController {
    private readonly tagService;
    constructor(tagService: TagService);
    createTag(crateTagDto: CreateTagDto, auth: Auth): Promise<import("../entities/tag.entity").TagEntity>;
    updateTag(updateTagDto: UpdateTagDto, auth: Auth): Promise<import("../entities/tag.entity").TagEntity>;
    daleteTag(tagId: number, auth: Auth): Promise<{
        message: string;
        status: number;
    }>;
    getList(auth: Auth, page: number, size: number): Promise<{
        list: any;
        count: any;
    }>;
}
