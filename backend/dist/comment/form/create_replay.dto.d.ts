import { Model } from '../../common/model';
export declare class CreateReplayDto extends Model {
    content: string;
    message_id: number;
    constructor(data: CreateReplayDto);
    attributeLabels(): {
        content: string;
        message_id: string;
    };
    rules(): (string | string[])[][];
}
