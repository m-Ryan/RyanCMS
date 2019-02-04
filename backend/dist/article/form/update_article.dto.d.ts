import { Model } from '../../common/model';
export declare class UpdateArticleDto extends Model {
    article_id: number;
    title?: string;
    content?: string;
    summary?: string;
    picture?: string;
    secret?: number;
    level?: number;
    tags?: number[];
    category_id?: number;
    constructor(data: UpdateArticleDto);
    attributeLabels(): {
        article_id: string;
        title: string;
        content: string;
        summary: string;
        picture: string;
        tags: string;
        secret: string;
        category_id: string;
    };
    rules(): (string | string[])[][];
}
