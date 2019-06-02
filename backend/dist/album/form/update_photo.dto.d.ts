import { Model } from '../../common/model';
export declare class UpdatePhotoDto extends Model {
    photo_id: number;
    name: string;
    constructor(data: UpdatePhotoDto);
    attributeLabels(): {
        photo_id: string;
        name: string;
    };
    rules(): (string | string[])[][];
}
