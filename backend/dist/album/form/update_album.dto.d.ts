import { Model } from '../../common/model';
export declare class UpdateAlbumDto extends Model {
    album_id: number;
    name?: string;
    picture?: string;
    desc?: string;
    secret?: number;
    constructor(data: UpdateAlbumDto);
    attributeLabels(): {
        album_id: string;
        name: string;
        desc: string;
        picture: string;
        secret: string;
    };
    rules(): (string | string[])[][];
}
