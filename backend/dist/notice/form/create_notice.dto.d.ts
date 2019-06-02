import { Model } from '../../common/model';
export declare class CreateNoticeDto extends Model {
    title: string;
    content: string;
    type: string;
    link: string;
    constructor(data: CreateNoticeDto);
    attributeLabels(): {
        title: string;
        content: string;
        type: string;
    };
    rules(): (string | string[])[][];
}
