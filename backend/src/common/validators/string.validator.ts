import { ValidateRuleOptions, Validator } from '../validator';
import * as _ from 'lodash';

export class StringValidator implements Validator {
  validate(
    attribute: string,
    value: any,
    options?: ValidateRuleOptions,
  ): string | Promise<string | null> | null {
    if (!_.isString(value)) {
      return '必须为字符串';
    }
    return null;
  }
}
