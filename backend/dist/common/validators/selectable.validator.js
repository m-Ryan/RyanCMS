"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = __importDefault(require("lodash"));
class SelectableValidator {
    validate(attribute, value, option) {
        if (value) {
            if (option === 'number') {
                if (!lodash_1.default.isNumber(value)) {
                    return '选填或者是数字';
                }
            }
            else if (option === 'string') {
                if (!lodash_1.default.isString(value)) {
                    return '选填或者是字符串';
                }
            }
            else if (option === 'array') {
                if (!lodash_1.default.isArray(value)) {
                    return '选填或者是数组';
                }
            }
            else if (option === 'int') {
                if (!lodash_1.default.isInteger(value)) {
                    return '选填或者是整数';
                }
            }
            else if (lodash_1.default.isFunction(value)) {
                return value();
            }
        }
        return null;
    }
}
exports.SelectableValidator = SelectableValidator;
//# sourceMappingURL=selectable.validator.js.map