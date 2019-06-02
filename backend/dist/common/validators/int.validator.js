"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = __importDefault(require("lodash"));
class IntValidator {
    validate(attribute, value, callback) {
        if (!lodash_1.default.isInteger(value)) {
            return '必须是整数';
        }
        if (typeof callback === 'function') {
            return callback(value, attribute);
        }
        return null;
    }
}
exports.IntValidator = IntValidator;
//# sourceMappingURL=int.validator.js.map