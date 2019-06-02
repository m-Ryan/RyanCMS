"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class PhoneValidator {
    validate(attribute, value, callback) {
        if (!/^\d{11}$/.test(value)) {
            return '格式不对';
        }
        if (typeof callback === 'function') {
            return callback(value, attribute);
        }
        return null;
    }
}
exports.PhoneValidator = PhoneValidator;
//# sourceMappingURL=phone.validator.js.map