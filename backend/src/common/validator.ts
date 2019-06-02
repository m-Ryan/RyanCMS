/**
 * 验证规则选项
 */
export interface ValidateRuleOptions {}

/**
 * 验证器接口
 */
export interface Validator {
  /**
   * 验证表单域
   * @param {string} attribute
   * @param value
   * @param options
   */
  validate(
    attribute: string,
    value: any,
    options?: ValidateRuleOptions,
  ): string | null | Promise<string | null>;
}

/**
 * 验证规则[字段列表,验证器名称,验证器属性]
 */
export type ValidateRule = [string[], string, ValidateRuleOptions];
/**
 * 基于回调的验证
 */
export type CallbackValidateRule = [
  string[],
  (attr?: string, value?: any, params?: ValidateRuleOptions) => string | null,
  ValidateRuleOptions
];
