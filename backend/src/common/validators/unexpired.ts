import { Validator } from '../validator';
import _ from 'lodash';
import dayjs from 'dayjs';

export class UnexpiredValidator implements Validator {
  validate(
    attribute: string,
    value: any,
    callback?: (val: any, attr: string) => string,
  ): string | Promise<string | null> | null {
    const currentTime = dayjs().unix();
    if (value < currentTime) {
      return '必须大于当前时间';
    }
    if (typeof callback === 'function') {
      return callback(value, attribute);
    }
    return null;
  }
}
