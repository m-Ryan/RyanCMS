"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dayjs_1 = __importDefault(require("dayjs"));
class UnexpiredValidator {
    validate(attribute, value, callback) {
        const currentTime = dayjs_1.default().unix();
        if (value < currentTime) {
            return '必须大于当前时间';
        }
        if (typeof callback === 'function') {
            return callback(value, attribute);
        }
        return null;
    }
}
exports.UnexpiredValidator = UnexpiredValidator;
//# sourceMappingURL=unexpired.js.map