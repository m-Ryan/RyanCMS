import { Model } from '../../common/model';
export declare class CreateCategoryDto extends Model {
    name: string;
    picture: string;
    desc: string;
    constructor(data: CreateCategoryDto);
    attributeLabels(): {
        name: string;
        desc: string;
        picture: string;
    };
    rules(): (string | string[])[][];
}
