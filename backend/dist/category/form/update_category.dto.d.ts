import { Model } from '../../common/model';
export declare class UpdateCategoryDto extends Model {
    category_id: number;
    name?: string;
    picture?: string;
    desc?: string;
    constructor(data: UpdateCategoryDto);
    attributeLabels(): {
        category_id: string;
        name: string;
        desc: string;
        picture: string;
    };
    rules(): (string | string[])[][];
}
