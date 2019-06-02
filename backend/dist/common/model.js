"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const _ = __importStar(require("lodash"));
const string_validator_1 = require("./validators/string.validator");
const required_validator_1 = require("./validators/required.validator");
const number_validator_1 = require("./validators/number.validator");
const selectable_validator_1 = require("./validators/selectable.validator");
const int_validator_1 = require("./validators/int.validator");
const unexpired_1 = require("./validators/unexpired");
const common_1 = require("@nestjs/common");
const phone_validator_1 = require("./validators/phone.validator");
const array_validator_1 = require("./validators/array.validator");
const userError_1 = require("./filters/userError");
class Model {
    validators() {
        return {
            string: new string_validator_1.StringValidator(),
            number: new number_validator_1.NumberValidator(),
            int: new int_validator_1.IntValidator(),
            required: new required_validator_1.RequiredValidator(),
            selectable: new selectable_validator_1.SelectableValidator(),
            unexpired: new unexpired_1.UnexpiredValidator(),
            phone: new phone_validator_1.PhoneValidator(),
            array: new array_validator_1.ArrayValidator(),
        };
    }
    setAttributes(data) {
        if (!_.isObject(data)) {
            throw new userError_1.UserError('参数不能为空');
        }
        Object.keys(data).forEach(key => {
            if (this.hasOwnProperty(key)) {
                this[key] = data[key];
                return;
            }
        });
    }
    validate() {
        return __awaiter(this, void 0, void 0, function* () {
            for (const rule of this.rules()) {
                if (rule.length < 2) {
                    throw new Error('验证器规则错误');
                }
                const [attrs, validator, options] = rule;
                for (const attr of attrs) {
                    const label = this.attributeLabels()[attr];
                    const value = this[attr];
                    let error;
                    if (_.isString(validator)) {
                        error = yield this.validators()[validator].validate(attr, value, options);
                    }
                    else {
                        error = yield validator(attr, validator, options);
                    }
                    if (error) {
                        throw new common_1.BadRequestException(label + error);
                    }
                }
            }
        });
    }
}
exports.Model = Model;
//# sourceMappingURL=model.js.map