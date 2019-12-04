import { Model } from '../../common/model';
export declare class UpdateJsonDto extends Model {
    id: number;
    content: string;
    constructor(data: UpdateJsonDto);
    attributeLabels(): {
        id: string;
        content: string;
    };
    rules(): (string | string[])[][];
}
