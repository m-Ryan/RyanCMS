import { CallbackValidateRule, ValidateRule, Validator } from './validator';
import * as _ from 'lodash';
import { StringValidator } from './validators/string.validator';
import { RequiredValidator } from './validators/required.validator';
import { NumberValidator } from './validators/number.validator';
import { SelectableValidator } from './validators/selectable.validator';
import { IntValidator } from './validators/int.validator';
import { UnexpiredValidator } from './validators/unexpired';
import { BadRequestException } from '@nestjs/common';
import { PhoneValidator } from './validators/phone.validator';
import { ArrayValidator } from './validators/array.validator';
import { UserError } from './filters/userError';

export abstract class Model {
  /**
   * 内置验证器
   */
  validators(): { [index: string]: Validator } {
    return {
      string: new StringValidator(),
      number: new NumberValidator(),
      int: new IntValidator(),
      required: new RequiredValidator(),
      selectable: new SelectableValidator(),
      unexpired: new UnexpiredValidator(),
      phone: new PhoneValidator(),
      array: new ArrayValidator(),
    };
  }

  /**
   * 验证规则
   * @returns {any[]}
   */
  abstract rules(): ValidateRule[] | any[] | CallbackValidateRule[];

  abstract attributeLabels(): { [attr: string]: string };

  /**
   * 设置属性
   * @param data
   */
  setAttributes(data: any) {
    if (!_.isObject(data)) {
      throw new UserError('参数不能为空');
    }
    Object.keys(data).forEach(key => {
      if (this.hasOwnProperty(key)) {
        (this as any)[key] = data[key];
        return;
      }
    });
  }

  /**
   * Model验证
   */
  async validate() {
    for (const rule of this.rules()) {
      if (rule.length < 2) {
        throw new Error('验证器规则错误');
      }
      const [attrs, validator, options] = rule;
      for (const attr of attrs) {
        const label = this.attributeLabels()[attr];
        const value = (this as any)[attr];
        let error: string;

        if (_.isString(validator)) {
          error = await this.validators()[validator].validate(
            attr,
            value,
            options,
          );
        } else {
          error = await validator(attr, validator, options);
        }
        if (error) {
          throw new BadRequestException(label + error);
        }
      }
    }
  }
}
