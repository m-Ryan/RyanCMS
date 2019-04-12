import { ValidateRuleOptions, Validator } from '../validator';
import _ from 'lodash';

export class PhoneValidator implements Validator {
	validate(
		attribute: string,
		value: any,
		callback?: (val: any, attr: string) => string
	): string | Promise<string | null> | null {
		if (!/^\d{11}$/.test(value)) {
			return '格式不对';
		}
		if (typeof callback === 'function') {
			return callback(value, attribute);
		}
		return null;
	}
}
