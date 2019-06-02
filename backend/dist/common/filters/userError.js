"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
class UserError extends common_1.HttpException {
    constructor(response, status = 500) {
        super(new Error(response), status);
    }
}
exports.UserError = UserError;
//# sourceMappingURL=userError.js.map