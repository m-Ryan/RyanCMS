import { ValidateRuleOptions, Validator } from '../validator';
import _ from 'lodash';

export class NumberValidator implements Validator {
  validate(
    attribute: string,
    value: any,
    callback?: (val: any, attr: string) => string,
  ): string | Promise<string | null> | null {
    if (!_.isNumber(value)) {
      return '必须是数字';
    }
    if (typeof callback === 'function') {
      return callback(value, attribute);
    }
    return null;
  }
}
