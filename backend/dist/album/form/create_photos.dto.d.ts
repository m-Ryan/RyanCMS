import { Model } from '../../common/model';
export declare class CreatePhotosDto extends Model {
    album_name: string;
    photos: string[];
    constructor(data: CreatePhotosDto);
    attributeLabels(): {
        album_name: string;
        photos: string;
    };
    rules(): ((string | string[])[] | (string[] | (() => string))[])[];
}
