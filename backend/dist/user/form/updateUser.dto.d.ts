import { Model } from '../../common/model';
export declare class UpdateUserDto extends Model {
    nickname: string;
    phone: string;
    password: string;
    sex: number;
    intro: string;
    avatar: string;
    github: string;
    email: string;
    weibo: string;
    zhihu: string;
    domain: string;
    constructor(data: UpdateUserDto);
    attributeLabels(): {
        nickname: string;
        phone: string;
        password: string;
        sex: string;
        intor: string;
        github: string;
        email: string;
        zhihu: string;
        weibo: string;
        domain: string;
    };
    rules(): (string | string[])[][];
}
