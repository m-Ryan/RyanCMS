import { Model } from '../../common/model';
export declare class RegisterDto extends Model {
    nickname: string;
    phone: string;
    password: string;
    constructor(data: RegisterDto);
    attributeLabels(): {
        nickname: string;
        phone: string;
        password: string;
    };
    rules(): (string | string[])[][];
}
