"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const model_1 = require("../../common/model");
class RegisterDto extends model_1.Model {
    constructor(data) {
        super();
        this.nickname = undefined;
        this.phone = undefined;
        this.password = undefined;
        super.setAttributes(data);
    }
    attributeLabels() {
        return {
            nickname: '昵称',
            phone: '手机号码',
            password: '密码',
        };
    }
    rules() {
        return [[['phone'], 'phone'], [['nickname', 'password'], 'string']];
    }
}
exports.RegisterDto = RegisterDto;
//# sourceMappingURL=register.dto.js.map