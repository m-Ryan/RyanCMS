import { ValidateRuleOptions, Validator } from '../validator';
import _ from 'lodash';

export class SelectableValidator implements Validator {
  validate(
    attribute: string,
    value: any,
    option?: ValidateRuleOptions,
  ): string | Promise<string | null> | null {
    if (value) {
      if (option === 'number') {
        if (!_.isNumber(value)) {
          return '选填或者是数字';
        }
      } else if (option === 'string') {
        if (!_.isString(value)) {
          return '选填或者是字符串';
        }
      } else if (option === 'array') {
        if (!_.isArray(value)) {
          return '选填或者是数组';
        }
      } else if (option === 'int') {
        if (!_.isInteger(value)) {
          return '选填或者是整数';
        }
      } else if (_.isFunction(value)) {
        return value();
      }
    }
    return null;
  }
}
