import { Model } from '../../common/model';
export declare class UpdateTagDto extends Model {
    tag_id: number;
    name?: string;
    picture?: string;
    desc?: string;
    constructor(data: UpdateTagDto);
    attributeLabels(): {
        tag_id: string;
        name: string;
        desc: string;
        picture: string;
    };
    rules(): (string | string[])[][];
}
