import { Model } from '../../common/model';
export declare class CreateMessageDto extends Model {
    content: string;
    comment_id?: number;
    constructor(data: CreateMessageDto);
    attributeLabels(): {
        content: string;
        comment_id: string;
    };
    rules(): (string | string[])[][];
}
