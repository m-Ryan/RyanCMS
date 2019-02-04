import { BaseEntity } from 'typeorm';
import { CreateTagDto } from '../form/create_tag.dto';
import { UpdateTagDto } from '../form/update_tag.dto';
import { ArticleEntity } from '../../article/entities/article.entity';
export declare class TagEntity extends BaseEntity {
    tag_id: number;
    name: string;
    picture: string;
    desc: string;
    created_at: number;
    user_id: number;
    update_at: number;
    deleted_at: number;
    articles: ArticleEntity[];
    static checkExist(name: string, userId: number): Promise<TagEntity>;
    static createTag(createTagDto: CreateTagDto, userId: number): Promise<TagEntity>;
    static updateTag(updateTagDto: UpdateTagDto, userId: number): Promise<TagEntity>;
    static deleteTag(tagId: number, userId: number): Promise<import("typeorm").DeleteResult>;
    static getTag(userId: number, name: string): Promise<TagEntity>;
    static getList(page: number, size: number, userId: number): Promise<{
        list: any;
        count: any;
    }>;
}
