import { Model } from '../../common/model';
export declare class CreateJsonDto extends Model {
    mod: string;
    name: string;
    content: string;
    constructor(data: CreateJsonDto);
    attributeLabels(): {
        mod: string;
        content: string;
        name: string;
    };
    rules(): (string | string[])[][];
}
