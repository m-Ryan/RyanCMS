import { Model } from '../../common/model';
export declare class CreateArticleDto extends Model {
    title: string;
    content: string;
    summary: string;
    picture: string;
    tags: number[];
    secret: number;
    category_id: number;
    constructor(data: CreateArticleDto);
    attributeLabels(): {
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
