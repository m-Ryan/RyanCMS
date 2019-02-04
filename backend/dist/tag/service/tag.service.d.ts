import { TagEntity } from '../entities/tag.entity';
import { CreateTagDto } from '../form/create_tag.dto';
import { UpdateTagDto } from '../form/update_tag.dto';
export declare class TagService {
    constructor();
    createTag(createTagDto: CreateTagDto, userId: number): Promise<TagEntity>;
    updateTag(updateTagDto: UpdateTagDto, userId: number): Promise<TagEntity>;
    daleteTag(tagId: number, userId: number): Promise<import("typeorm").DeleteResult>;
    getList(page: number, size: number, userId: number): Promise<{
        list: any;
        count: any;
    }>;
    getTag(userId: number, name: string): Promise<TagEntity>;
}
