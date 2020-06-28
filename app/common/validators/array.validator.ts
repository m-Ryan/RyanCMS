import { Validator } from '../validator';
import _ from 'lodash';

export class ArrayValidator implements Validator {
  validate(
    attribute: string,
    value: any,
    callback?: (val: any, attr: string) => string,
  ): string | Promise<string | null> | null {
    if (!_.isArray(value)) {
      return '必须是数组';
    }
    if (typeof callback === 'function') {
      return callback(value, attribute);
    }
    return null;
  }
}
