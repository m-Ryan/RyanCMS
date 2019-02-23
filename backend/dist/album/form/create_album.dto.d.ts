import { Model } from '../../common/model';
export declare class CreateAlbumeDto extends Model {
    name: string;
    desc: string;
    secret: number;
    picture: string;
    constructor(data: CreateAlbumeDto);
    attributeLabels(): {
        name: string;
        desc: string;
        secret: string;
    };
    rules(): (string | string[])[][];
}
