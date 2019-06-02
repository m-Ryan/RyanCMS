"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const model_1 = require("../../common/model");
class LoginDto extends model_1.Model {
    constructor(data) {
        super();
        this.phone = undefined;
        this.password = undefined;
        super.setAttributes(data);
    }
    attributeLabels() {
        return {
            phone: '手机号码',
            password: '密码',
        };
    }
    rules() {
        return [[['phone'], 'phone'], [['password'], 'string']];
    }
}
exports.LoginDto = LoginDto;
//# sourceMappingURL=login.dto.js.map