import { Model } from '../../common/model';
export declare class CreateTagDto extends Model {
    name: string;
    picture: string;
    desc: string;
    constructor(data: CreateTagDto);
    attributeLabels(): {
        name: string;
        desc: string;
        picture: string;
    };
    rules(): (string | string[])[][];
}
