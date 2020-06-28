import { ValidateRuleOptions, Validator } from '../validator';

/**
 * 必填验证器
 */
export class RequiredValidator implements Validator {
  validate(
    attribute: string,
    value: any,
    options?: ValidateRuleOptions,
  ): string | Promise<string | null> | null {
    if (value === undefined) {
      return '不能为空';
    }
    return null;
  }
}
