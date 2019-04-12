"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const model_1 = require("../../common/model");
class UpdateUserDto extends model_1.Model {
    constructor(data) {
        super();
        this.nickname = undefined;
        this.phone = undefined;
        this.password = undefined;
        this.sex = undefined;
        this.intro = undefined;
        this.avatar = undefined;
        this.github = undefined;
        this.email = undefined;
        this.weibo = undefined;
        this.zhihu = undefined;
        this.domain = undefined;
        super.setAttributes(data);
    }
    attributeLabels() {
        return {
            nickname: '昵称',
            phone: '手机号码',
            password: '密码',
            sex: '性别',
            intor: '简介',
            github: 'github',
            email: '邮我',
            zhihu: '知乎',
            weibo: '微博',
            domain: '独立域名'
        };
    }
    rules() {
        return [[['phone'], 'phone'], [['nickname'], 'required']];
    }
}
exports.UpdateUserDto = UpdateUserDto;
//# sourceMappingURL=updateUser.dto.js.map