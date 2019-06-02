"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class RequiredValidator {
    validate(attribute, value, options) {
        if (value === undefined) {
            return '不能为空';
        }
        return null;
    }
}
exports.RequiredValidator = RequiredValidator;
//# sourceMappingURL=required.validator.js.map