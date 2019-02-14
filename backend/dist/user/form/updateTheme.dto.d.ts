import { Model } from '../../common/model';
export declare class UpdateThemeDto extends Model {
    music: string;
    color: string;
    constructor(data: UpdateThemeDto);
    attributeLabels(): {
        color: string;
        music: string;
    };
    rules(): (string | string[])[][];
}
