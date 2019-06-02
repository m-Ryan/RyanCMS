import { Validator } from '../validator';
import _ from 'lodash';

export class IntValidator implements Validator {
  validate(
    attribute: string,
    value: any,
    callback?: (val: any, attr: string) => string,
  ): string | Promise<string | null> | null {
    if (!_.isInteger(value)) {
      return '必须是整数';
    }
    if (typeof callback === 'function') {
      return callback(value, attribute);
    }
    return null;
  }
}
