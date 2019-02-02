"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const _ = __importStar(require("lodash"));
class StringValidator {
    validate(attribute, value, options) {
        if (!_.isString(value)) {
            return '必须为字符串';
        }
        return null;
    }
}
exports.StringValidator = StringValidator;
//# sourceMappingURL=string.validator.js.map