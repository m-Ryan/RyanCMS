import { Model } from '../../common/model';
export declare class LoginDto extends Model {
    phone: string;
    password: string;
    constructor(data: LoginDto);
    attributeLabels(): {
        phone: string;
        password: string;
    };
    rules(): (string | string[])[][];
}
