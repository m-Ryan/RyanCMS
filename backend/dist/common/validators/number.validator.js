"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = __importDefault(require("lodash"));
class NumberValidator {
    validate(attribute, value, callback) {
        if (!lodash_1.default.isNumber(value)) {
            return '必须是数字';
        }
        if (typeof callback === 'function') {
            return callback(value, attribute);
        }
        return null;
    }
}
exports.NumberValidator = NumberValidator;
//# sourceMappingURL=number.validator.js.map